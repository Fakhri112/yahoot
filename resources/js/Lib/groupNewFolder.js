const groupNewFolder = (folders_data) => {
    let arrayFolder = [];

    const backtrack = (folders) => {
        for (let index = 0; index < folders.length; index++) {
            let folder = folders[index];
            checkChildren =
                folder?.children == null ? folder.children.length : 0;
            if (folder?.children != 0 && !folder.hasOwnProperty("parent_id")) {
                backtrack(folder.children);
                continue;
            } else if (
                checkChildren == 0 &&
                !folder.hasOwnProperty("parent_id")
            ) {
                continue;
            } else if (Number.isInteger(folder?.parent_id)) {
                arrayFolder.push(folder);
            }
        }
        return true;
    };

    backtrack(folders_data);
    return arrayFolder;
};

export { groupNewFolder };
