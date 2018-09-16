const config = require('./config.json')
const notifier = require('./google-home-notifier');

class GoogleHome {

    say(text) {
        notifier(config.googleHome.host, config.googleHome.lang).notify(text);
    }

    sayTemperature(temp) {
        let text = config.googleHome.phrase.getTemperature.replace('\$', temp);
        this.say(text)
    }

    sayHumidity(hum) {
        let text = config.googleHome.phrase.getHumidity.replace('\$', hum);
        this.say(text)
    }

}

module.exports = new GoogleHome();
