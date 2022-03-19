module.exports = (drama, episodes, buttons) => {
    let link = 't.me/localohmychbot?start='

    if (episodes.length == 1) {
        buttons.push([
            {'text': '⬇ '+episodes[0].epno, 'callback_data': 'getEp' + episodes[0].msgId},
            {'text': '-', 'callback_data': `nextep${drama.dramaId}`},
            {'text': '-', 'callback_data': `nextep${drama.dramaId}`}
        ], 
        [{ 'text': '▬▬▬ @dramastore1 ▬▬▬▬', 'callback_data': `update${drama.dramaId}` }])
    }

    else if (episodes.length == 2) {
        buttons.push([
            {'text': '⬇ '+episodes[0].epno, 'callback_data': 'getEp' + episodes[0].msgId},
            {'text': '⬇ '+episodes[1].epno, 'callback_data': 'getEp' + episodes[1].msgId},
            {'text': '-', 'callback_data': `nextep${drama.dramaId}`}
        ], 
        [{ 'text': '▬▬▬ @dramastore1 ▬▬▬▬', 'callback_data': `update${drama.dramaId}` }])
    }

    else if (episodes.length == 3) {
        buttons.push([
            {'text': '⬇ '+episodes[0].epno, 'callback_data': 'getEp' + episodes[0].msgId},
            {'text': '⬇ '+episodes[1].epno, 'callback_data': 'getEp' + episodes[1].msgId},
            {'text': '⬇ '+episodes[2].epno, 'callback_data': 'getEp' + episodes[2].msgId}
        ],
        [
            {'text': '-', 'callback_data': `nextep${drama.dramaId}`},
            {'text': '-', 'callback_data': `nextep${drama.dramaId}`},
            {'text': '-', 'callback_data': `nextep${drama.dramaId}`}
        ],
        [{ 'text': '▬▬▬ @dramastore1 ▬▬▬▬', 'callback_data': `update${drama.dramaId}` }])
    }

    else if (episodes.length == 4) {
        buttons.push(
        [
            {'text': '⬇ '+episodes[0].epno, 'callback_data': 'getEp' + episodes[0].msgId},
            {'text': '⬇ '+episodes[1].epno, 'callback_data': 'getEp' + episodes[1].msgId},
            {'text': '⬇ '+episodes[2].epno, 'callback_data': 'getEp' + episodes[2].msgId}
        ], 
        [
            {'text': '⬇ '+episodes[3].epno, 'callback_data': 'getEp' + episodes[3].msgId},
            {'text': '-', 'callback_data': `nextep${drama.dramaId}`},
            {'text': '-', 'callback_data': `nextep${drama.dramaId}`}
        ],

        [{ 'text': '▬▬▬ @dramastore1 ▬▬▬▬', 'callback_data': `update${drama.dramaId}` }])
    }

    else if (episodes.length == 5) {
        buttons.push(
        [
            {'text': '⬇ '+episodes[0].epno, 'callback_data': 'getEp' + episodes[0].msgId},
            {'text': '⬇ '+episodes[1].epno, 'callback_data': 'getEp' + episodes[1].msgId},
            {'text': '⬇ '+episodes[2].epno, 'callback_data': 'getEp' + episodes[2].msgId}
        ], 
        [
            {'text': '⬇ '+episodes[3].epno, 'callback_data': 'getEp' + episodes[3].msgId},
            {'text': '⬇ '+episodes[4].epno, 'callback_data': 'getEp' + episodes[4].msgId},
            {'text': '-', 'callback_data': `nextep${drama.dramaId}`}
        ],

        [{ 'text': '▬▬▬ @dramastore1 ▬▬▬▬', 'callback_data': `update${drama.dramaId}` }])
    }

    else if (episodes.length == 6) {
        buttons.push(
        [
            {'text': '⬇ '+episodes[0].epno, 'callback_data': 'getEp' + episodes[0].msgId},
            {'text': '⬇ '+episodes[1].epno, 'callback_data': 'getEp' + episodes[1].msgId},
            {'text': '⬇ '+episodes[2].epno, 'callback_data': 'getEp' + episodes[2].msgId}
        ],
        [
            {'text': '⬇ '+episodes[3].epno, 'callback_data': 'getEp' + episodes[3].msgId},
            {'text': '⬇ '+episodes[4].epno, 'callback_data': 'getEp' + episodes[4].msgId},
            {'text': '⬇ '+episodes[5].epno, 'callback_data': 'getEp' + episodes[5].msgId},
        ],
        [
            {'text': '-', 'callback_data': `nextep${drama.dramaId}`},
            {'text': '-', 'callback_data': `nextep${drama.dramaId}`},
            {'text': '-', 'callback_data': `nextep${drama.dramaId}`}
        ],

        [{ 'text': '▬▬▬ @dramastore1 ▬▬▬▬', 'callback_data': `update${drama.dramaId}` }])
    }

    else if (episodes.length == 7) {
        buttons.push(
        [
            {'text': '⬇ '+episodes[0].epno, 'callback_data': 'getEp' + episodes[0].msgId},
            {'text': '⬇ '+episodes[1].epno, 'callback_data': 'getEp' + episodes[1].msgId},
            {'text': '⬇ '+episodes[2].epno, 'callback_data': 'getEp' + episodes[2].msgId}
        ], 
        [
            {'text': '⬇ '+episodes[3].epno, 'callback_data': 'getEp' + episodes[3].msgId},
            {'text': '⬇ '+episodes[4].epno, 'callback_data': 'getEp' + episodes[4].msgId},
            {'text': '⬇ '+episodes[5].epno, 'callback_data': 'getEp' + episodes[5].msgId}
        ],
        [
            {'text': '⬇ '+episodes[6].epno, 'callback_data': 'getEp' + episodes[6].msgId},
            {'text': '-', 'callback_data': `nextep${drama.dramaId}`},
            {'text': '-', 'callback_data': `nextep${drama.dramaId}`}
        ],

        [{ 'text': '▬▬▬ @dramastore1 ▬▬▬▬', 'callback_data': `update${drama.dramaId}` }])
    }

    else if (episodes.length == 8) {
        buttons.push(
        [
            {'text': '⬇ '+episodes[0].epno, 'callback_data': 'getEp' + episodes[0].msgId},
            {'text': '⬇ '+episodes[1].epno, 'callback_data': 'getEp' + episodes[1].msgId},
            {'text': '⬇ '+episodes[2].epno, 'callback_data': 'getEp' + episodes[2].msgId}
        ], 
        [
            {'text': '⬇ '+episodes[3].epno, 'callback_data': 'getEp' + episodes[3].msgId},
            {'text': '⬇ '+episodes[4].epno, 'callback_data': 'getEp' + episodes[4].msgId},
            {'text': '⬇ '+episodes[5].epno, 'callback_data': 'getEp' + episodes[5].msgId}
        ],
        [
            {'text': '⬇ '+episodes[6].epno, 'callback_data': 'getEp' + episodes[6].msgId},
            {'text': '⬇ '+episodes[7].epno, 'callback_data': 'getEp' + episodes[7].msgId},
            {'text': '-', 'callback_data': `nextep${drama.dramaId}`},
        ],

        [{ 'text': '▬▬▬ @dramastore1 ▬▬▬▬', 'callback_data': `update${drama.dramaId}` }])
    }

    else if (episodes.length == 9) {
        buttons.push(
        [
            {'text': '⬇ '+episodes[0].epno, 'callback_data': 'getEp' + episodes[0].msgId},
            {'text': '⬇ '+episodes[1].epno, 'callback_data': 'getEp' + episodes[1].msgId},
            {'text': '⬇ '+episodes[2].epno, 'callback_data': 'getEp' + episodes[2].msgId}
        ], 
        [
            {'text': '⬇ '+episodes[3].epno, 'callback_data': 'getEp' + episodes[3].msgId},
            {'text': '⬇ '+episodes[4].epno, 'callback_data': 'getEp' + episodes[4].msgId},
            {'text': '⬇ '+episodes[5].epno, 'callback_data': 'getEp' + episodes[5].msgId}
        ],
        [
            {'text': '⬇ '+episodes[6].epno, 'callback_data': 'getEp' + episodes[6].msgId},
            {'text': '⬇ '+episodes[7].epno, 'callback_data': 'getEp' + episodes[7].msgId},
            {'text': '⬇ '+episodes[8].epno, 'callback_data': 'getEp' + episodes[8].msgId},
        ],
        [
            {'text': '-', 'callback_data': `nextep${drama.dramaId}`},
            {'text': '-', 'callback_data': `nextep${drama.dramaId}`},
            {'text': '-', 'callback_data': `nextep${drama.dramaId}`}
        ],
        [{ 'text': '▬▬▬ @dramastore1 ▬▬▬▬', 'callback_data': `update${drama.dramaId}` }])
    }

    else if (episodes.length == 10) {
        buttons.push(
        [
            {'text': '⬇ '+episodes[0].epno, 'callback_data': 'getEp' + episodes[0].msgId},
            {'text': '⬇ '+episodes[1].epno, 'callback_data': 'getEp' + episodes[1].msgId},
            {'text': '⬇ '+episodes[2].epno, 'callback_data': 'getEp' + episodes[2].msgId}
        ], 
        [
            {'text': '⬇ '+episodes[3].epno, 'callback_data': 'getEp' + episodes[3].msgId},
            {'text': '⬇ '+episodes[4].epno, 'callback_data': 'getEp' + episodes[4].msgId},
            {'text': '⬇ '+episodes[5].epno, 'callback_data': 'getEp' + episodes[5].msgId}
        ],
        [
            {'text': '⬇ '+episodes[6].epno, 'callback_data': 'getEp' + episodes[6].msgId},
            {'text': '⬇ '+episodes[7].epno, 'callback_data': 'getEp' + episodes[7].msgId},
            {'text': '⬇ '+episodes[8].epno, 'callback_data': 'getEp' + episodes[8].msgId},
        ],
        [
            {'text': '⬇ '+episodes[9].epno, 'callback_data': 'getEp' + episodes[9].msgId},
            {'text': '-', 'callback_data': `nextep${drama.dramaId}`},
            {'text': '-', 'callback_data': `nextep${drama.dramaId}`},
        ],

        [{ 'text': '▬▬▬ @dramastore1 ▬▬▬▬', 'callback_data': `update${drama.dramaId}` }])
    }

    else if (episodes.length == 11) {
        buttons.push(
        [
            {'text': '⬇ '+episodes[0].epno, 'callback_data': 'getEp' + episodes[0].msgId},
            {'text': '⬇ '+episodes[1].epno, 'callback_data': 'getEp' + episodes[1].msgId},
            {'text': '⬇ '+episodes[2].epno, 'callback_data': 'getEp' + episodes[2].msgId}
        ], 
        [
            {'text': '⬇ '+episodes[3].epno, 'callback_data': 'getEp' + episodes[3].msgId},
            {'text': '⬇ '+episodes[4].epno, 'callback_data': 'getEp' + episodes[4].msgId},
            {'text': '⬇ '+episodes[5].epno, 'callback_data': 'getEp' + episodes[5].msgId}
        ],
        [
            {'text': '⬇ '+episodes[6].epno, 'callback_data': 'getEp' + episodes[6].msgId},
            {'text': '⬇ '+episodes[7].epno, 'callback_data': 'getEp' + episodes[7].msgId},
            {'text': '⬇ '+episodes[8].epno, 'callback_data': 'getEp' + episodes[8].msgId},
        ],
        [
            {'text': '⬇ '+episodes[9].epno, 'callback_data': 'getEp' + episodes[9].msgId},
            {'text': '⬇ '+episodes[10].epno, 'callback_data': 'getEp' + episodes[10].msgId},
            {'text': '-', 'callback_data': `nextep${drama.dramaId}`},
        ],

        [{ 'text': '▬▬▬ @dramastore1 ▬▬▬▬', 'callback_data': `update${drama.dramaId}` }])
    }

    else if (episodes.length == 12) {
        buttons.push(
        [
            {'text': '⬇ '+episodes[0].epno, 'callback_data': 'getEp' + episodes[0].msgId},
            {'text': '⬇ '+episodes[1].epno, 'callback_data': 'getEp' + episodes[1].msgId},
            {'text': '⬇ '+episodes[2].epno, 'callback_data': 'getEp' + episodes[2].msgId}
        ], 
        [
            {'text': '⬇ '+episodes[3].epno, 'callback_data': 'getEp' + episodes[3].msgId},
            {'text': '⬇ '+episodes[4].epno, 'callback_data': 'getEp' + episodes[4].msgId},
            {'text': '⬇ '+episodes[5].epno, 'callback_data': 'getEp' + episodes[5].msgId}
        ],
        [
            {'text': '⬇ '+episodes[6].epno, 'callback_data': 'getEp' + episodes[6].msgId},
            {'text': '⬇ '+episodes[7].epno, 'callback_data': 'getEp' + episodes[7].msgId},
            {'text': '⬇ '+episodes[8].epno, 'callback_data': 'getEp' + episodes[8].msgId},
        ],
        [
            {'text': '⬇ '+episodes[9].epno, 'callback_data': 'getEp' + episodes[9].msgId},
            {'text': '⬇ '+episodes[10].epno, 'callback_data': 'getEp' + episodes[10].msgId},
            {'text': '⬇ '+episodes[11].epno, 'callback_data': 'getEp' + episodes[11].msgId},
        ],

        [{ 'text': '▬▬▬ @dramastore1 ▬▬▬▬', 'callback_data': `update${drama.dramaId}` }])
    }

    else if (episodes.length == 13) {
        buttons.push(
        [
            {'text': '⬇ '+episodes[0].epno, 'callback_data': 'getEp' + episodes[0].msgId},
            {'text': '⬇ '+episodes[1].epno, 'callback_data': 'getEp' + episodes[1].msgId},
            {'text': '⬇ '+episodes[2].epno, 'callback_data': 'getEp' + episodes[2].msgId}
        ], 
        [
            {'text': '⬇ '+episodes[3].epno, 'callback_data': 'getEp' + episodes[3].msgId},
            {'text': '⬇ '+episodes[4].epno, 'callback_data': 'getEp' + episodes[4].msgId},
            {'text': '⬇ '+episodes[5].epno, 'callback_data': 'getEp' + episodes[5].msgId}
        ],
        [
            {'text': '⬇ '+episodes[6].epno, 'callback_data': 'getEp' + episodes[6].msgId},
            {'text': '⬇ '+episodes[7].epno, 'callback_data': 'getEp' + episodes[7].msgId},
            {'text': '⬇ '+episodes[8].epno, 'callback_data': 'getEp' + episodes[8].msgId},
        ],
        [
            {'text': '⬇ '+episodes[9].epno, 'callback_data': 'getEp' + episodes[9].msgId},
            {'text': '⬇ '+episodes[10].epno, 'callback_data': 'getEp' + episodes[10].msgId},
            {'text': '⬇ '+episodes[11].epno, 'callback_data': 'getEp' + episodes[11].msgId},
        ],
        [
            {'text': '⬇ '+episodes[12].epno, 'callback_data': 'getEp' + episodes[12].msgId},
            {'text': '-', 'callback_data': `nextep${drama.dramaId}`},
            {'text': '-', 'callback_data': `nextep${drama.dramaId}`}
        ],

        [{ 'text': '▬▬▬ @dramastore1 ▬▬▬▬', 'callback_data': `update${drama.dramaId}` }])
    }

    else if (episodes.length == 14) {
        buttons.push(
        [
            {'text': '⬇ '+episodes[0].epno, 'callback_data': 'getEp' + episodes[0].msgId},
            {'text': '⬇ '+episodes[1].epno, 'callback_data': 'getEp' + episodes[1].msgId},
            {'text': '⬇ '+episodes[2].epno, 'callback_data': 'getEp' + episodes[2].msgId}
        ], 
        [
            {'text': '⬇ '+episodes[3].epno, 'callback_data': 'getEp' + episodes[3].msgId},
            {'text': '⬇ '+episodes[4].epno, 'callback_data': 'getEp' + episodes[4].msgId},
            {'text': '⬇ '+episodes[5].epno, 'callback_data': 'getEp' + episodes[5].msgId}
        ],
        [
            {'text': '⬇ '+episodes[6].epno, 'callback_data': 'getEp' + episodes[6].msgId},
            {'text': '⬇ '+episodes[7].epno, 'callback_data': 'getEp' + episodes[7].msgId},
            {'text': '⬇ '+episodes[8].epno, 'callback_data': 'getEp' + episodes[8].msgId},
        ],
        [
            {'text': '⬇ '+episodes[9].epno, 'callback_data': 'getEp' + episodes[9].msgId},
            {'text': '⬇ '+episodes[10].epno, 'callback_data': 'getEp' + episodes[10].msgId},
            {'text': '⬇ '+episodes[11].epno, 'callback_data': 'getEp' + episodes[11].msgId},
        ],
        [
            {'text': '⬇ '+episodes[12].epno, 'callback_data': 'getEp' + episodes[12].msgId},
            {'text': '⬇ '+episodes[13].epno, 'callback_data': 'getEp' + episodes[13].msgId},
            {'text': '-', 'callback_data': `nextep${drama.dramaId}`},
        ],

        [{ 'text': '▬▬▬ @dramastore1 ▬▬▬▬', 'callback_data': `update${drama.dramaId}` }])
    }

    else if (episodes.length == 15) {
        buttons.push(
        [
            {'text': '⬇ '+episodes[0].epno, 'callback_data': 'getEp' + episodes[0].msgId},
            {'text': '⬇ '+episodes[1].epno, 'callback_data': 'getEp' + episodes[1].msgId},
            {'text': '⬇ '+episodes[2].epno, 'callback_data': 'getEp' + episodes[2].msgId}
        ], 
        [
            {'text': '⬇ '+episodes[3].epno, 'callback_data': 'getEp' + episodes[3].msgId},
            {'text': '⬇ '+episodes[4].epno, 'callback_data': 'getEp' + episodes[4].msgId},
            {'text': '⬇ '+episodes[5].epno, 'callback_data': 'getEp' + episodes[5].msgId}
        ],
        [
            {'text': '⬇ '+episodes[6].epno, 'callback_data': 'getEp' + episodes[6].msgId},
            {'text': '⬇ '+episodes[7].epno, 'callback_data': 'getEp' + episodes[7].msgId},
            {'text': '⬇ '+episodes[8].epno, 'callback_data': 'getEp' + episodes[8].msgId},
        ],
        [
            {'text': '⬇ '+episodes[9].epno, 'callback_data': 'getEp' + episodes[9].msgId},
            {'text': '⬇ '+episodes[10].epno, 'callback_data': 'getEp' + episodes[10].msgId},
            {'text': '⬇ '+episodes[11].epno, 'callback_data': 'getEp' + episodes[11].msgId},
        ],
        [
            {'text': '⬇ '+episodes[12].epno, 'callback_data': 'getEp' + episodes[12].msgId},
            {'text': '⬇ '+episodes[13].epno, 'callback_data': 'getEp' + episodes[13].msgId},
            {'text': '⬇ '+episodes[14].epno, 'callback_data': 'getEp' + episodes[14].msgId},
        ],

        [{ 'text': '▬▬▬ @dramastore1 ▬▬▬▬', 'callback_data': `update${drama.dramaId}` }])
    }

    else if (episodes.length == 16) {
        buttons.push(
        [
            {'text': '⬇ '+episodes[0].epno, 'callback_data': 'getEp' + episodes[0].msgId},
            {'text': '⬇ '+episodes[1].epno, 'callback_data': 'getEp' + episodes[1].msgId},
            {'text': '⬇ '+episodes[2].epno, 'callback_data': 'getEp' + episodes[2].msgId}
        ], 
        [
            {'text': '⬇ '+episodes[3].epno, 'callback_data': 'getEp' + episodes[3].msgId},
            {'text': '⬇ '+episodes[4].epno, 'callback_data': 'getEp' + episodes[4].msgId},
            {'text': '⬇ '+episodes[5].epno, 'callback_data': 'getEp' + episodes[5].msgId}
        ],
        [
            {'text': '⬇ '+episodes[6].epno, 'callback_data': 'getEp' + episodes[6].msgId},
            {'text': '⬇ '+episodes[7].epno, 'callback_data': 'getEp' + episodes[7].msgId},
            {'text': '⬇ '+episodes[8].epno, 'callback_data': 'getEp' + episodes[8].msgId},
        ],
        [
            {'text': '⬇ '+episodes[9].epno, 'callback_data': 'getEp' + episodes[9].msgId},
            {'text': '⬇ '+episodes[10].epno, 'callback_data': 'getEp' + episodes[10].msgId},
            {'text': '⬇ '+episodes[11].epno, 'callback_data': 'getEp' + episodes[11].msgId},
        ],
        [
            {'text': '⬇ '+episodes[12].epno, 'callback_data': 'getEp' + episodes[12].msgId},
            {'text': '⬇ '+episodes[13].epno, 'callback_data': 'getEp' + episodes[13].msgId},
            {'text': '⬇ '+episodes[14].epno, 'callback_data': 'getEp' + episodes[14].msgId},
        ],
        [
            {'text': '⬇ '+episodes[15].epno, 'callback_data': 'getEp' + episodes[15].msgId},
            {'text': '✨', 'callback_data': `nextep${drama.dramaId}`},
            {'text': '✨', 'callback_data': `nextep${drama.dramaId}`},
        ],

        [{ 'text': '▬▬▬ @dramastore1 ▬▬▬▬', 'callback_data': `update${drama.dramaId}` }])
    }

    else if (episodes.length == 17) {
        buttons.push(
        [
            {'text': '⬇ '+episodes[0].epno, 'callback_data': 'getEp' + episodes[0].msgId},
            {'text': '⬇ '+episodes[1].epno, 'callback_data': 'getEp' + episodes[1].msgId},
            {'text': '⬇ '+episodes[2].epno, 'callback_data': 'getEp' + episodes[2].msgId}
        ], 
        [
            {'text': '⬇ '+episodes[3].epno, 'callback_data': 'getEp' + episodes[3].msgId},
            {'text': '⬇ '+episodes[4].epno, 'callback_data': 'getEp' + episodes[4].msgId},
            {'text': '⬇ '+episodes[5].epno, 'callback_data': 'getEp' + episodes[5].msgId}
        ],
        [
            {'text': '⬇ '+episodes[6].epno, 'callback_data': 'getEp' + episodes[6].msgId},
            {'text': '⬇ '+episodes[7].epno, 'callback_data': 'getEp' + episodes[7].msgId},
            {'text': '⬇ '+episodes[8].epno, 'callback_data': 'getEp' + episodes[8].msgId},
        ],
        [
            {'text': '⬇ '+episodes[9].epno, 'callback_data': 'getEp' + episodes[9].msgId},
            {'text': '⬇ '+episodes[10].epno, 'callback_data': 'getEp' + episodes[10].msgId},
            {'text': '⬇ '+episodes[11].epno, 'callback_data': 'getEp' + episodes[11].msgId},
        ],
        [
            {'text': '⬇ '+episodes[12].epno, 'callback_data': 'getEp' + episodes[12].msgId},
            {'text': '⬇ '+episodes[13].epno, 'callback_data': 'getEp' + episodes[13].msgId},
            {'text': '⬇ '+episodes[14].epno, 'callback_data': 'getEp' + episodes[14].msgId},
        ],
        [
            {'text': '⬇ '+episodes[15].epno, 'callback_data': 'getEp' + episodes[15].msgId},
            {'text': '⬇ '+episodes[16].epno, 'callback_data': 'getEp' + episodes[16].msgId},
            {'text': '✨', 'callback_data': `nextep${drama.dramaId}`},
        ],

        [{ 'text': '▬▬▬ @dramastore1 ▬▬▬▬', 'callback_data': `update${drama.dramaId}` }])
    }

    else if (episodes.length == 18) {
        buttons.push(
        [
            {'text': '⬇ '+episodes[0].epno, 'callback_data': 'getEp' + episodes[0].msgId},
            {'text': '⬇ '+episodes[1].epno, 'callback_data': 'getEp' + episodes[1].msgId},
            {'text': '⬇ '+episodes[2].epno, 'callback_data': 'getEp' + episodes[2].msgId}
        ], 
        [
            {'text': '⬇ '+episodes[3].epno, 'callback_data': 'getEp' + episodes[3].msgId},
            {'text': '⬇ '+episodes[4].epno, 'callback_data': 'getEp' + episodes[4].msgId},
            {'text': '⬇ '+episodes[5].epno, 'callback_data': 'getEp' + episodes[5].msgId}
        ],
        [
            {'text': '⬇ '+episodes[6].epno, 'callback_data': 'getEp' + episodes[6].msgId},
            {'text': '⬇ '+episodes[7].epno, 'callback_data': 'getEp' + episodes[7].msgId},
            {'text': '⬇ '+episodes[8].epno, 'callback_data': 'getEp' + episodes[8].msgId},
        ],
        [
            {'text': '⬇ '+episodes[9].epno, 'callback_data': 'getEp' + episodes[9].msgId},
            {'text': '⬇ '+episodes[10].epno, 'callback_data': 'getEp' + episodes[10].msgId},
            {'text': '⬇ '+episodes[11].epno, 'callback_data': 'getEp' + episodes[11].msgId},
        ],
        [
            {'text': '⬇ '+episodes[12].epno, 'callback_data': 'getEp' + episodes[12].msgId},
            {'text': '⬇ '+episodes[13].epno, 'callback_data': 'getEp' + episodes[13].msgId},
            {'text': '⬇ '+episodes[14].epno, 'callback_data': 'getEp' + episodes[14].msgId},
        ],
        [
            {'text': '⬇ '+episodes[15].epno, 'callback_data': 'getEp' + episodes[15].msgId},
            {'text': '⬇ '+episodes[16].epno, 'callback_data': 'getEp' + episodes[16].msgId},
            {'text': '⬇ '+episodes[17].epno, 'callback_data': 'getEp' + episodes[17].msgId},
        ],

        [{ 'text': '▬▬▬ @dramastore1 ▬▬▬▬', 'callback_data': `update${drama.dramaId}` }])
    }

    else if (episodes.length == 19) {
        buttons.push(
        [
            {'text': '⬇ '+episodes[0].epno, 'callback_data': 'getEp' + episodes[0].msgId},
            {'text': '⬇ '+episodes[1].epno, 'callback_data': 'getEp' + episodes[1].msgId},
            {'text': '⬇ '+episodes[2].epno, 'callback_data': 'getEp' + episodes[2].msgId}
        ], 
        [
            {'text': '⬇ '+episodes[3].epno, 'callback_data': 'getEp' + episodes[3].msgId},
            {'text': '⬇ '+episodes[4].epno, 'callback_data': 'getEp' + episodes[4].msgId},
            {'text': '⬇ '+episodes[5].epno, 'callback_data': 'getEp' + episodes[5].msgId}
        ],
        [
            {'text': '⬇ '+episodes[6].epno, 'callback_data': 'getEp' + episodes[6].msgId},
            {'text': '⬇ '+episodes[7].epno, 'callback_data': 'getEp' + episodes[7].msgId},
            {'text': '⬇ '+episodes[8].epno, 'callback_data': 'getEp' + episodes[8].msgId},
        ],
        [
            {'text': '⬇ '+episodes[9].epno, 'callback_data': 'getEp' + episodes[9].msgId},
            {'text': '⬇ '+episodes[10].epno, 'callback_data': 'getEp' + episodes[10].msgId},
            {'text': '⬇ '+episodes[11].epno, 'callback_data': 'getEp' + episodes[11].msgId},
        ],
        [
            {'text': '⬇ '+episodes[12].epno, 'callback_data': 'getEp' + episodes[12].msgId},
            {'text': '⬇ '+episodes[13].epno, 'callback_data': 'getEp' + episodes[13].msgId},
            {'text': '⬇ '+episodes[14].epno, 'callback_data': 'getEp' + episodes[14].msgId},
        ],
        [
            {'text': '⬇ '+episodes[15].epno, 'callback_data': 'getEp' + episodes[15].msgId},
            {'text': '⬇ '+episodes[16].epno, 'callback_data': 'getEp' + episodes[16].msgId},
            {'text': '⬇ '+episodes[17].epno, 'callback_data': 'getEp' + episodes[17].msgId},
        ],
        [
            {'text': '⬇ '+episodes[18].epno, 'callback_data': 'getEp' + episodes[18].msgId},
            {'text': '✨', 'callback_data': `nextep${drama.dramaId}`},
            {'text': '✨', 'callback_data': `nextep${drama.dramaId}`},
        ],

        [{ 'text': '▬▬▬ @dramastore1 ▬▬▬▬', 'callback_data': `update${drama.dramaId}` }])
    }
     
    else if (episodes.length == 20) {
        buttons.push(
        [
            {'text': '⬇ '+episodes[0].epno, 'callback_data': 'getEp' + episodes[0].msgId},
            {'text': '⬇ '+episodes[1].epno, 'callback_data': 'getEp' + episodes[1].msgId},
            {'text': '⬇ '+episodes[2].epno, 'callback_data': 'getEp' + episodes[2].msgId}
        ], 
        [
            {'text': '⬇ '+episodes[3].epno, 'callback_data': 'getEp' + episodes[3].msgId},
            {'text': '⬇ '+episodes[4].epno, 'callback_data': 'getEp' + episodes[4].msgId},
            {'text': '⬇ '+episodes[5].epno, 'callback_data': 'getEp' + episodes[5].msgId}
        ],
        [
            {'text': '⬇ '+episodes[6].epno, 'callback_data': 'getEp' + episodes[6].msgId},
            {'text': '⬇ '+episodes[7].epno, 'callback_data': 'getEp' + episodes[7].msgId},
            {'text': '⬇ '+episodes[8].epno, 'callback_data': 'getEp' + episodes[8].msgId},
        ],
        [
            {'text': '⬇ '+episodes[9].epno, 'callback_data': 'getEp' + episodes[9].msgId},
            {'text': '⬇ '+episodes[10].epno, 'callback_data': 'getEp' + episodes[10].msgId},
            {'text': '⬇ '+episodes[11].epno, 'callback_data': 'getEp' + episodes[11].msgId},
        ],
        [
            {'text': '⬇ '+episodes[12].epno, 'callback_data': 'getEp' + episodes[12].msgId},
            {'text': '⬇ '+episodes[13].epno, 'callback_data': 'getEp' + episodes[13].msgId},
            {'text': '⬇ '+episodes[14].epno, 'callback_data': 'getEp' + episodes[14].msgId},
        ],
        [
            {'text': '⬇ '+episodes[15].epno, 'callback_data': 'getEp' + episodes[15].msgId},
            {'text': '⬇ '+episodes[16].epno, 'callback_data': 'getEp' + episodes[16].msgId},
            {'text': '⬇ '+episodes[17].epno, 'callback_data': 'getEp' + episodes[17].msgId},
        ],
        [
            {'text': '⬇ '+episodes[19].epno, 'callback_data': 'getEp' + episodes[19].msgId},
            {'text': '⬇ '+episodes[20].epno, 'callback_data': 'getEp' + episodes[20].msgId},
            {'text': '✨', 'callback_data': `nextep${drama.dramaId}`},
        ],

        [{ 'text': '▬▬▬ @dramastore1 ▬▬▬▬', 'callback_data': `update${drama.dramaId}` }])
    }
}