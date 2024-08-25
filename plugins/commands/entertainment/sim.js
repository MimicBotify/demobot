import axios from 'axios'; // Ensure axios is imported

const config = {
    name: "sim",
    aliases: ["s"],
    description: "Chat with the Sim bot",
    usage: "[args]",
    cooldown: 5,
    permissions: [0], // Modify permissions based on your needs
    isAbsolute: false,
    isHidden: false,
    credits: "ProCoderMew",
    extra: {
        APIKEY: "Meew_bUnnsLweYeuBabAwUmz6Okd4JLmjWx"
    }
};

const langData = {
    "lang_1": {
        "message": "Chat with the Sim bot",
    },
    "lang_2": {
        "message": "Chat with the Sim bot",
    }
};

/** @type {TOnCallCommand} */
async function onCall({ message, args, getLang, extra, data, userPermissions, prefix }) {
    // Hardcoded threadID for testing
    const threadID = '7176676739042851';

    // Log the data object for debugging
    console.log("Received data object:", data);
    console.log("Using hardcoded threadID:", threadID);

    const APIKEY = extra.APIKEY;

    // Ensure message and args are present
    if (!args || args.length === 0) {
        message.send(getLang("message"));
        return;
    }

    const query = args.join(" ");
    const encodedQuery = encodeURIComponent(query);

    try {
        const response = await axios({
            url: `https://meewmeew.info/simsimi/api?ask=${encodedQuery}&apikey=${APIKEY}`,
            method: "GET"
        });

        if (response.data.success) {
            message.send(response.data.msg);
        } else {
            message.send(response.data.error);
        }
    } catch (error) {
        console.error("Error:", error);
        message.send("An error occurred while processing your request.");
    }
}

export default {
    config,
    langData,
    onCall
};
