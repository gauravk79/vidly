


function init() {
    //Sentry.init({dsn: "https://cdd30d538ce24a0d8d0a9605df371cfc@o394306.ingest.sentry.io/5244243"});
}

function log(error) {
    //Sentry.captureException(error);
    console.error("logger -",error);
}

export default {
    init, log
};