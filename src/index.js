import { MicroConfig, getConfig } from './utils';
import distributeCore from './distribute';
import Micro from './micro';


const OnePiece = async (config = {}) => {
  // 根据基础配置区分乾坤的配置与icestark的配置
  const { envEngine, _config } = await getConfig(config);
  console.log('envEngine= >>>>', envEngine)
  const microInstance = await Micro(envEngine, _config);

  // 注册全局配置
  await MicroConfig.useConfig({
    microInstance
  });

  console.log('microInstance =>>>>', microInstance)

  // 微应用引擎开始加载
  return microInstance.start(config)
}

export const domReadiedStart = async () => {
  const { microInstance } = MicroConfig.getConfig();
  microInstance && microInstance.domReadiedStart();

  distributeCore();
}

export default OnePiece;