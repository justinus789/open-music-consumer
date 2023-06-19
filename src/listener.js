class Listener {
  constructor(playlistsService, mailSender) {
    this.playlistsService = playlistsService;
    this.mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlistId, userId, targetEmail } = JSON.parse(message.content.toString());

      const playlist = await this.playlistsService.getPlaylistById(playlistId, userId);
      playlist.songs = await this.playlistsService.getPlaylistSongsById(playlistId);
      console.log(playlist);
      const result = await this.mailSender.sendEmail(
        targetEmail,
        JSON.stringify(playlist),
      );
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
