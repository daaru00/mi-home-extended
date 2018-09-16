const miio = require('miio');
const config = require('./config.json')

class MiHome {

    constructor() {
        this.devices = {};
    }

    load() {
        console.info('Looking for gateway..')

        const devices = miio.devices({
            cacheTime: 300
        });

        devices.on('available', async deviceDiscovered => {
            if (deviceDiscovered.id == config.gateway.id) {
                console.info('Gateway found!')
                let device = await miio.device({ address: deviceDiscovered.address, token: config.gateway.token });
                console.debug('Connected to: ', device.miioModel)
                let children = device.children();
                for (let child of children) {

                    if (child.model == 'lumi.gateway.v3.light') {
                        this.devices.light = child;
                        continue;
                    }

                    console.debug('Child found: ' + child.miioModel);
                    switch (child.miioModel) {
                        case 'lumi.plug':
                            this.devices.plug = child;
                            break;
                        case 'lumi.magnet':
                            this.devices.door = child;
                            break;
                        case 'lumi.switch':
                            this.devices.switch = child;
                            break;
                        case 'lumi.sensor_ht':
                            this.devices.sensor = child;
                            break;
                        case 'lumi.motion':
                            this.devices.motion = child;
                            break;
                        default:
                            console.debug('Connected child not recognized:', child.metadata.types);
                    }

                }
            }
        });

        devices.on('unavailable', device => {
            console.error('device disconnected:', device)
        });
    }

    async getTemperature() {
        if (this.devices.sensor) {
            let response = await this.devices.sensor.value('temperature')
            return response.value;
        }else{
            return null;
        }
    }

    async getHumidity() {
        if (this.devices.sensor) {
            let response = await this.devices.sensor.value('humidity')
            return response.value;
        }else{
            return null;
        }
    }

}

module.exports = new MiHome();
