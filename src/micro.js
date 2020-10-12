
import { getAppsConfig, getMainApi, getSimpleIceStarkConfig, getOriginQiankunApi, MicroConfig } from './utils';
import icestarkStart from './icestark';
// import { start, registerMicroApps } from 'qiankun';
import { qiankunStart } from 'umi';
// import { createApp } from 'ice';

const Micro = async (envEngine, config) => {
  const _envEngine = envEngine;
  const { iceStarkApps, qiankunApps } = await getAppsConfig(config, _envEngine);
  const { iceStarkMainApi, qiankunMainApi } = await getMainApi(config, _envEngine);
  
  const _icestarkConfig = {
    ...iceStarkMainApi,
    apps: iceStarkApps
  }
  const _qiankunConfig = {
    ...qiankunMainApi,
    apps: qiankunApps
  }

  console.log('_qiankunConfig =====> ', _qiankunConfig)
  console.log('_icestarkConfig =====> ', _icestarkConfig)

  return {
    start: async () => {
      if(_envEngine === 'icestark') {
        // const _simpleIceStarkConfig = getSimpleIceStarkConfig(_icestarkConfig);

        // const icestarkSimpleStart = createApp;
        // icestarkSimpleStart && icestarkSimpleStart(_simpleIceStarkConfig);
        // MicroConfig.setConfig({
        //   icestarkStart: () => icestarkSimpleStart(_simpleIceStarkConfig)
        // })

        // import('ice').then(mod => {
        //   const icestarkSimpleStart = mod && mod.createApp;
        //   icestarkSimpleStart && icestarkSimpleStart(_simpleIceStarkConfig);
        //   MicroConfig.setConfig({
        //     icestarkStart: () => icestarkSimpleStart(_simpleIceStarkConfig)
        //   })
        // }).catch(e => {

        //   throw new Error(e)
        // })
      } else {
        console.log('icestarkStart =>>>>>', MicroConfig.getConfig())
        MicroConfig.setConfig({
          icestarkStart: () => icestarkStart(_icestarkConfig)
        })

        icestarkStart(_icestarkConfig);
      }

      if (_envEngine === 'qiankun') {

        // import('umi').then(mod => {
        //   const _qiankunStart = mod && mod.qiankunStart;
        //   MicroConfig.setConfig({
        //     qiankunStart: _qiankunStart
        //   })
        // })
        console.log('qiankunStart =>>>>>', MicroConfig.getConfig())

        MicroConfig.setConfig({
          qiankunStart: qiankunStart
        })

        return new Promise(resolve => resolve(_qiankunConfig))
      } else {
        // const apps = getOriginQiankunApi(_qiankunConfig.apps)

        // registerMicroApps(apps);

        // MicroConfig.setConfig({
        //   qiankunStart: start
        // })
        // start();
      }
      console.log('MicroConfig =>>>>', MicroConfig.getConfig())
    },
    getConfig: () => ({
      icestarkConfig: _icestarkConfig,
      qiankunConfig: _qiankunConfig
    }),
    domReadiedStart: () => {
      const { qiankunStart, icestarkStart } = MicroConfig.getConfig();
      icestarkStart && icestarkStart();
      qiankunStart && qiankunStart();
    }
  }
}

export default Micro;