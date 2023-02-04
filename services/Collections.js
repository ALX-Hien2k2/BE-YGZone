class Collections {
    user = process.env.USER_COLLECTION_NAME;
    getListCollections() {
      return [this.user];
    //   return [this.user, this.post, this.hotel, this.comment];
    }
}

module.exports = Collections;