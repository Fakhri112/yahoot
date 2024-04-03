function peerOpen(peer) {
    return new Promise((resolve, reject) => {
        peer.on("open", function (id = true) {
            resolve(id);
        });
        peer.on("error", function (err) {
            reject(err);
        });
    });
}

export { peerOpen };
