const { Pool } = require('pg');

class PlylistsService {
  constructor() {
    this.pool = new Pool();
  }

  async getPlaylistById(id, owner) {
    const query = {
      text: `SELECT playlists.id, playlists.name
      FROM playlists 
      LEFT JOIN collaborations ON collaborations.playlist_id = playlists.id
      LEFT JOIN users ON users.id = playlists.owner
      WHERE playlists.id = $1 AND (users.id = $2 OR collaborations.user_id = $2)`,
      values: [id, owner],
    };
    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async getPlaylistSongsById(id) {
    const query = {
      text: `SELECT songs.id, songs.title, songs.performer 
      FROM songs
      LEFT JOIN playlist_songs ON playlist_songs.song_id = songs.id 
      WHERE playlist_songs.playlist_id = $1`,
      values: [id],
    };
    const result = await this.pool.query(query);

    return result.rows;
  }
}

module.exports = PlylistsService;
