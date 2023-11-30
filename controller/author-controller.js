// Menyediakan 
const dbConfig = require('../config/db-config')
const mysql = require('mysql2');
// createPool : Menghubungkan project ke db hanya sekali di awal
const pool = mysql.createPool(dbConfig)

// Kalau ada err, err nya dimunculin di console
pool.on('error', (err) => {
    console.error(err);
})

// Membuat format hasil API kalau http response status code nya 400-an
const responseAuthorNotFound = (res) => res.status(404).json({
    success: false,
    message: 'Author Not Found'
})

// Membuat format hasil API kalau http response status code nya 200
const responseSuccess = (res, results, message) => res.status(200).json({
    success: true,
    message: message,
    data: results
})

const getAuthors = (req, res) => {
    // Menyambungkan ke konfigurasi db sebelumnya
    const query = 'SELECT * FROM author;';

    // Parameter 1 : Menangkap error
    // Parameter 2 : Mencoba koneksi ke db nya
    pool.getConnection((err, connection) => {
        // if tanpa () bisa digunakan ketika proses dalam if hanya satu
        // Kalau pas proses awal koneksi ketemu err, kode dibawah bakal diskip dan mengembalikan hasil response err-nya 
        if (err) throw err;

        // Menjalankan perintah sql : parameter 3
        // Parameter 1 : variable yang isinya perintah sql
        // Parameter 2 (optional) : variable yang mengirim data (hanya dijalankan untuk tambah/update) 
        // Parameter 3 : function yang menangani hasil reqs sql nya : 2 parameter (mengambil data err, mengambil data hasil)
        connection.query(query, (err, results) => {
            if (err) throw err;

            // Ketika berhasil format API disamakan dengan di function responseSuccess
            responseSuccess(res, results, 'author successfully fetched');
        });
        // Memberhentikan koneksi kalau query nya udah selesai dijalanin
        connection.release();
    });
};

const getAuthor = (req, res) => {
    const id = req.params.id;

    const query = `SELECT * FROM author WHERE id = ${id};`;

    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(query, (err, results) => {
            if (err) throw err;

            if (results.length == 0) {
                responseAuthorNotFound(res);
                return;
            }

            responseSuccess(res, results, 'author successfully fetched');
        });
        connection.release();
    });
};

const addAuthor = (req, res) => {
    const data = {
        name: req.body.name,
        year: req.body.year,
        publisher: req.body.publisher,
        city: req.body.city,
        editor: req.body.editor,
    };
    // ? : parameter yang perlu diisi
    // ? : diisi sama connection.query parameter ke 2
    const query = 'INSERT INTO author SET ?;';

    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(query, [data], (err, results) => {
            if (err) throw err;

            responseSuccess(res, results, 'author successfully added');
        });
        connection.release();
    });
}

const editAuthor = (req, res) => {
    const data = {
    name: req.body.name,
    year: req.body.year,
    publisher: req.body.publisher,
    city: req.body.city,
    editor: req.body.editor,
};

    const id = req.params.id

    const query = `UPDATE author SET ? WHERE id = ${id}`

    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(query, [data], (err, results) => {
            if (err) throw err;

            if (results.affectedRows == 0) {
                responseAuthorNotFound(res);
                return;
            }

            responseSuccess(res, results, 'author successfully updated');
        });
        connection.release();
    });
}

const deleteAuthor = (req, res) => {
    const id = req.params.id

    const query = `DELETE FROM author WHERE id = ${id}`

    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(query, (err, results) => {
            if (err) throw err;

            if (results.affectedRows == 0) {
                responseAuthorNotFound(res);
                return;
            }

            responseSuccess(res, results, 'author successfully deleted');
        });
        connection.release();
    });
}

// Kalau gak di export gabisa dipake, wajib
module.exports = {
    getAuthors, getAuthor, addAuthor, editAuthor, deleteAuthor
}