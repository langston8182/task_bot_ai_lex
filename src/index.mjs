import { handleAddTask } from "./handlers/add_task.mjs";

export const lambdaHandler = async (event) => {
    console.log("Lex Event:", JSON.stringify(event, null, 2));

    const intentName = event.currentIntent.name;

    let responseMessage;

    try {
        switch (intentName) {
            case "AjouterTacheIntent":
                responseMessage = await handleAddTask(event);
                break;
            default:
                responseMessage = "Je ne comprends pas votre demande.";
        }
    } catch (error) {
        console.error("Error processing intent:", error);
        responseMessage = "Une erreur est survenue, veuillez réessayer.";
    }

    return formatLexResponse(responseMessage);
};

const formatLexResponse = (message) => ({
    dialogAction: {
        type: "Close",
        fulfillmentState: "Fulfilled",
        message: {
            contentType: "PlainText",
            content: message,
        },
    },
});
