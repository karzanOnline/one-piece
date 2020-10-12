import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { isArray } from 'lodash';

import { AppRouter, AppRoute } from '@ice/stark';
import { iceStarkFlattenConfig } from './utils'
import distributeCore from './distribute';

const IceStarkInstance = (props) => {
  const { apps, rootId, Layout, OtherComponents, routerType } = props;
  const [pathname, setPathname] = useState('');

  const getAllApps = () => {
    if (isArray(apps)) {
      return apps.map(app => <AppRoute {...app}/>)
    }
    return null;
  }
  const handleRouteChange = (pathname, hash, type) => console.log('route change from icestark', pathname, hash, type)


  return (
    <Layout pathname={pathname}>
      <AppRouter
        {...OtherComponents}
        onRouteChange={handleRouteChange}
      >
        {getAllApps()}
      </AppRouter>
    </Layout>
  )
}

// 暂时套用api
const iceStarkStart = (config = {}, envEngine) => {
  const { rootId, ...otherConfig} = iceStarkFlattenConfig(config);
  const subAppContainerDom = document.getElementById(rootId);

  if (!subAppContainerDom) {
    return null;
  }

  ReactDOM.render(
    <IceStarkInstance
      {...otherConfig}
    />, document.getElementById(rootId));
}

export default iceStarkStart;