const fs = require("node:fs");
const SQLite = require("sqlite3").verbose();

const createDatabaseFile = () => {
  if(fs.existsSync("base")) return;
  fs.mkdirSync("base");
  if(fs.existsSync("base/_storage.db")) return;
  fs.writeFileSync("base/_storage.db", "", err => {
    if(err) throw Error(err);
  })
}
const ROOT_FOLDER = '844ca667-83c2-4747-aab9-926d901ae4b9';
const TYPE = {
  NOTE: 0,
  FOLDER: 1
}
const notAllowed = ['created_at', 'updated_at', 'active']

class EasyNotesDb {
  constructor(dbSync = false) {
    createDatabaseFile();
    this._conn = new SQLite.Database(
      "./base/_storage.db",
      SQLite.OPEN_READWRITE,
      (err) => {
        if (err) throw Error(`Could not connect to database:`, err);
      }
    );
    if(dbSync) this.dropDatabase()
    this.createTables();
    this.populateDefaultValues().catch((err) => console.error(err.message));
  }
  dropDatabase() {
    this._conn.run(`DROP TABLE IF EXISTS t_item`);
    this._conn.run(`DROP TABLE IF EXISTS t_types`);
  }
  createTables() {
    this._conn.serialize(() => {
      this._conn.run(
        `CREATE TABLE IF NOT EXISTS t_types(id INTEGER PRIMARY KEY, name TEXT NOT NULL)`,
        (err) => {
          if (err) throw Error(`Could not create t_types table`, err);
        }
      );
      this._conn.run(
        `CREATE TABLE IF NOT EXISTS t_item(
            uuid TEXT PRIMARY KEY,
            data TEXT,
            view_extended INTEGER,
            theme TEXT,
            parent_folder TEXT,
            type INTEGER,
            created_at TEXT NOT NULL DEFAULT current_timestamp,
            updated_at TEXT NOT NULL DEFAULT current_timestamp,
            active INTEGER,
            CONSTRAINT fk_item_parent_folder FOREIGN KEY (parent_folder) REFERENCES t_item(uuid),
            CONSTRAINT fk_item_type FOREIGN KEY (type) REFERENCES t_types(id)
        )`,
        (err) => {
          if (err) throw Error(`Could not create t_types table`, err);
        }
      );
    });
  }
  populateDefaultValues() {
    return new Promise((resolve, reject) => {
      this._conn.run(
        `INSERT OR IGNORE INTO t_types(id, name) VALUES (?, ?), (?, ?)`,
        [TYPE.NOTE, "note", TYPE.FOLDER, "folder"],
        (err) => {
          if (err) return reject(err);
          return resolve(true);
        }
      );
      this._conn.run(
        `INSERT OR IGNORE INTO t_item(uuid, data, type) VALUES (?, ?, ?)`,
        [this.ROOT_FOLDER, "root", TYPE.FOLDER, "folder"],
        (err) => {
          if (err) return reject(err);
          return resolve(true);
        }
      );
    });
  }
  createNote(note, folderId) {
    if(!folderId) folderId = ROOT_FOLDER
    return new Promise((resolve, reject) => {
      this._conn.run(`INSERT INTO t_item(uuid, data, theme, view_extended, type, parent_folder, active) VALUES (?, ?, ?, ?, ?, ?, ?)`, [note.uuid, note.data, note.theme, note.view_extended, TYPE.NOTE, folderId, 1], (err) => {
        if(err) return reject(err);
        return resolve({id: note.uuid})
      })
    })
  }
  getAllNotes(data) {
    let { page, pageSize } = data;
    if(!page) page = 0;
    if(!pageSize) pageSize = 4;
    return new Promise((resolve, reject) => {
      this._conn.serialize(() => {
        this._conn.all("SELECT uuid FROM t_item WHERE type=?", [TYPE.NOTE], (err, result) => {
          if(err) return reject(err);
          const count = result.length;
          this._conn.all(`SELECT uuid, data, theme, view_extended as extended, type, parent_folder as parentFolder, active, updated_at, created_at FROM t_item as note WHERE type = ? AND active = TRUE ORDER BY created_at LIMIT ? OFFSET ?`, [TYPE.NOTE, pageSize, page * pageSize], (err, rows) => {
            if(err) return reject(err);
            return resolve({data: rows, count})
          })
        })
      })
    })
  }
  getNote({ uuid }) {
    let sql = `SELECT * FROM t_item as note WHERE uuid = ? AND active = TRUE`
    return new Promise((resolve, reject) => {
      this._conn.get(sql, [uuid], (err, row) => {
        if(err) return reject(err);
        return resolve(row)
      })
    })
  }
  searchNote({ text }) {
    return new Promise((resolve, reject) => {
      this._conn.all(`SELECT * FROM t_items WHERE data LIKE ?`, [`%${text}%`], (err, rows) => {
        if (err) return reject(err);
        return resolve(rows);
      });
    });
  }
  updateNote(noteData, uuid) {
    let query = `UPDATE t_item SET`;
    let args = []
    let index = 0
    for(let item in noteData) {
      if(notAllowed.includes(item)) continue;
      console.log(item)
      query += `${index !== 0 ? "," : ""} ${item}=?`
      args.push(noteData[item]);
      index++
    }
    query += " WHERE uuid=?"
    console.log(query)
    console.log(args)
    return new Promise((resolve, reject) => {
      this._conn.run(query, [...args, uuid], (err) => {
        if (err) return reject(err);
        return resolve(true);
      });
    });
  }
  softDeleteNote(noteId) {
    return new Promise((resolve, reject) => {
      this._conn.run(`UPDATE t_item SET active = 0 WHERE uuid = ?`, [noteId], (err) => {
        if (err) return reject(err);
        return resolve(true);
      });
    });
  }
  hardDeleteNote(noteId) {}

  getAllTypes() {
    return new Promise((resolve, reject) => {
      this._conn.all(`SELECT * FROM t_types`, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows);
      });
    });
  }
}

module.exports = EasyNotesDb;
