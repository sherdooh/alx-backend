{"payload":{"allShortcutsEnabled":true,"fileTree":{"0x03-queuing_system_in_js":{"items":[{"name":"node_modules","path":"0x03-queuing_system_in_js/node_modules","contentType":"directory"},{"name":"redis-6.0.10","path":"0x03-queuing_system_in_js/redis-6.0.10","contentType":"directory"},{"name":".babelrc","path":"0x03-queuing_system_in_js/.babelrc","contentType":"file"},{"name":".eslintrc.js","path":"0x03-queuing_system_in_js/.eslintrc.js","contentType":"file"},{"name":"0-redis_client.js","path":"0x03-queuing_system_in_js/0-redis_client.js","contentType":"file"},{"name":"1-redis_op.js","path":"0x03-queuing_system_in_js/1-redis_op.js","contentType":"file"},{"name":"100-seat.js","path":"0x03-queuing_system_in_js/100-seat.js","contentType":"file"},{"name":"2-redis_op_async.js","path":"0x03-queuing_system_in_js/2-redis_op_async.js","contentType":"file"},{"name":"4-redis_advanced_op.js","path":"0x03-queuing_system_in_js/4-redis_advanced_op.js","contentType":"file"},{"name":"5-publisher.js","path":"0x03-queuing_system_in_js/5-publisher.js","contentType":"file"},{"name":"5-subscriber.js","path":"0x03-queuing_system_in_js/5-subscriber.js","contentType":"file"},{"name":"6-job_creator.js","path":"0x03-queuing_system_in_js/6-job_creator.js","contentType":"file"},{"name":"6-job_processor.js","path":"0x03-queuing_system_in_js/6-job_processor.js","contentType":"file"},{"name":"7-job_creator.js","path":"0x03-queuing_system_in_js/7-job_creator.js","contentType":"file"},{"name":"7-job_processor.js","path":"0x03-queuing_system_in_js/7-job_processor.js","contentType":"file"},{"name":"8-job.js","path":"0x03-queuing_system_in_js/8-job.js","contentType":"file"},{"name":"8-job.test.js","path":"0x03-queuing_system_in_js/8-job.test.js","contentType":"file"},{"name":"9-stock.js","path":"0x03-queuing_system_in_js/9-stock.js","contentType":"file"},{"name":"README.md","path":"0x03-queuing_system_in_js/README.md","contentType":"file"},{"name":"babel.config.js","path":"0x03-queuing_system_in_js/babel.config.js","contentType":"file"},{"name":"dump.rdb","path":"0x03-queuing_system_in_js/dump.rdb","contentType":"file"},{"name":"package-lock.json","path":"0x03-queuing_system_in_js/package-lock.json","contentType":"file"},{"name":"package.json","path":"0x03-queuing_system_in_js/package.json","contentType":"file"},{"name":"redis-6.0.10.tar.gz","path":"0x03-queuing_system_in_js/redis-6.0.10.tar.gz","contentType":"file"},{"name":"yarn.lock","path":"0x03-queuing_system_in_js/yarn.lock","contentType":"file"}],"totalCount":25},"":{"items":[{"name":"0x00-pagination","path":"0x00-pagination","contentType":"directory"},{"name":"0x01-caching","path":"0x01-caching","contentType":"directory"},{"name":"0x02-i18n","path":"0x02-i18n","contentType":"directory"},{"name":"0x03-queuing_system_in_js","path":"0x03-queuing_system_in_js","contentType":"directory"},{"name":"README.md","path":"README.md","contentType":"file"}],"totalCount":5}},"fileTreeProcessingTime":6.252625,"foldersToFetch":[],"reducedMotionEnabled":"system","repo":{"id":629637599,"defaultBranch":"master","name":"alx-backend","ownerLogin":"Jayneey","currentUserCanPush":false,"isFork":false,"isEmpty":false,"createdAt":"2023-04-18T21:07:04.000+03:00","ownerAvatar":"https://avatars.githubusercontent.com/u/75577542?v=4","public":true,"private":false,"isOrgOwned":false},"symbolsExpanded":true,"treeExpanded":false,"refInfo":{"name":"master","listCacheKey":"v0:1681841655.0","canEdit":true,"refType":"branch","currentOid":"1a7889f4abddac2aeb4307577df5efd0f2ccd7a7"},"path":"0x03-queuing_system_in_js/8-job.test.js","currentUser":{"id":55084539,"login":"sherdooh","userEmail":"sherkiplah@gmail.com"},"blob":{"rawLines":["#!/usr/bin/yarn test","import sinon from 'sinon';","import { expect } from 'chai';","import { createQueue } from 'kue';","import createPushNotificationsJobs from './8-job.js';","","describe('createPushNotificationsJobs', () => {","  const BIG_BROTHER = sinon.spy(console);","  const QUEUE = createQueue({ name: 'push_notification_code_test' });","","  before(() => {","    QUEUE.testMode.enter(true);","  });","","  after(() => {","    QUEUE.testMode.clear();","    QUEUE.testMode.exit();","  });","","  afterEach(() => {","    BIG_BROTHER.log.resetHistory();","  });","","  it('displays an error message if jobs is not an array', () => {","    expect(","      createPushNotificationsJobs.bind(createPushNotificationsJobs, {}, QUEUE)","    ).to.throw('Jobs is not an array');","  });","","  it('adds jobs to the queue with the correct type', (done) => {","    expect(QUEUE.testMode.jobs.length).to.equal(0);","    const jobInfos = [","      {","        phoneNumber: '44556677889',","        message: 'Use the code 1982 to verify your account',","      },","      {","        phoneNumber: '98877665544',","        message: 'Use the code 1738 to verify your account',","      },","    ];","    createPushNotificationsJobs(jobInfos, QUEUE);","    expect(QUEUE.testMode.jobs.length).to.equal(2);","    expect(QUEUE.testMode.jobs[0].data).to.deep.equal(jobInfos[0]);","    expect(QUEUE.testMode.jobs[0].type).to.equal('push_notification_code_3');","    QUEUE.process('push_notification_code_3', () => {","      expect(","        BIG_BROTHER.log","          .calledWith('Notification job created:', QUEUE.testMode.jobs[0].id)","      ).to.be.true;","      done();","    });","  });","","  it('registers the progress event handler for a job', (done) => {","    QUEUE.testMode.jobs[0].addListener('progress', () => {","      expect(","        BIG_BROTHER.log","          .calledWith('Notification job', QUEUE.testMode.jobs[0].id, '25% complete')","      ).to.be.true;","      done();","    });","    QUEUE.testMode.jobs[0].emit('progress', 25);","  });","","  it('registers the failed event handler for a job', (done) => {","    QUEUE.testMode.jobs[0].addListener('failed', () => {","      expect(","        BIG_BROTHER.log","          .calledWith('Notification job', QUEUE.testMode.jobs[0].id, 'failed:', 'Failed to send')","      ).to.be.true;","      done();","    });","    QUEUE.testMode.jobs[0].emit('failed', new Error('Failed to send'));","  });","","  it('registers the complete event handler for a job', (done) => {","    QUEUE.testMode.jobs[0].addListener('complete', () => {","      expect(","        BIG_BROTHER.log","          .calledWith('Notification job', QUEUE.testMode.jobs[0].id, 'completed')","      ).to.be.true;","      done();","    });","    QUEUE.testMode.jobs[0].emit('complete');","  });","});"],"stylingDirectives":[[],[{"start":0,"end":6,"cssClass":"pl-k"},{"start":7,"end":12,"cssClass":"pl-s1"},{"start":13,"end":17,"cssClass":"pl-k"},{"start":18,"end":25,"cssClass":"pl-s"},{"start":25,"end":26,"cssClass":"pl-kos"}],[{"start":0,"end":6,"cssClass":"pl-k"},{"start":7,"end":8,"cssClass":"pl-kos"},{"start":9,"end":15,"cssClass":"pl-s1"},{"start":16,"end":17,"cssClass":"pl-kos"},{"start":18,"end":22,"cssClass":"pl-k"},{"start":23,"end":29,"cssClass":"pl-s"},{"start":29,"end":30,"cssClass":"pl-kos"}],[{"start":0,"end":6,"cssClass":"pl-k"},{"start":7,"end":8,"cssClass":"pl-kos"},{"start":9,"end":20,"cssClass":"pl-s1"},{"start":21,"end":22,"cssClass":"pl-kos"},{"start":23,"end":27,"cssClass":"pl-k"},{"start":28,"end":33,"cssClass":"pl-s"},{"start":33,"end":34,"cssClass":"pl-kos"}],[{"start":0,"end":6,"cssClass":"pl-k"},{"start":7,"end":34,"cssClass":"pl-s1"},{"start":35,"end":39,"cssClass":"pl-k"},{"start":40,"end":52,"cssClass":"pl-s"},{"start":52,"end":53,"cssClass":"pl-kos"}],[],[{"start":0,"end":8,"cssClass":"pl-en"},{"start":8,"end":9,"cssClass":"pl-kos"},{"start":9,"end":38,"cssClass":"pl-s"},{"start":38,"end":39,"cssClass":"pl-kos"},{"start":40,"end":41,"cssClass":"pl-kos"},{"start":41,"end":42,"cssClass":"pl-kos"},{"start":43,"end":45,"cssClass":"pl-c1"},{"start":46,"end":47,"cssClass":"pl-kos"}],[{"start":2,"end":7,"cssClass":"pl-k"},{"start":8,"end":19,"cssClass":"pl-c1"},{"start":20,"end":21,"cssClass":"pl-c1"},{"start":22,"end":27,"cssClass":"pl-s1"},{"start":27,"end":28,"cssClass":"pl-kos"},{"start":28,"end":31,"cssClass":"pl-en"},{"start":31,"end":32,"cssClass":"pl-kos"},{"start":32,"end":39,"cssClass":"pl-smi"},{"start":39,"end":40,"cssClass":"pl-kos"},{"start":40,"end":41,"cssClass":"pl-kos"}],[{"start":2,"end":7,"cssClass":"pl-k"},{"start":8,"end":13,"cssClass":"pl-c1"},{"start":14,"end":15,"cssClass":"pl-c1"},{"start":16,"end":27,"cssClass":"pl-en"},{"start":27,"end":28,"cssClass":"pl-kos"},{"start":28,"end":29,"cssClass":"pl-kos"},{"start":30,"end":34,"cssClass":"pl-c1"},{"start":36,"end":65,"cssClass":"pl-s"},{"start":66,"end":67,"cssClass":"pl-kos"},{"start":67,"end":68,"cssClass":"pl-kos"},{"start":68,"end":69,"cssClass":"pl-kos"}],[],[{"start":2,"end":8,"cssClass":"pl-en"},{"start":8,"end":9,"cssClass":"pl-kos"},{"start":9,"end":10,"cssClass":"pl-kos"},{"start":10,"end":11,"cssClass":"pl-kos"},{"start":12,"end":14,"cssClass":"pl-c1"},{"start":15,"end":16,"cssClass":"pl-kos"}],[{"start":4,"end":9,"cssClass":"pl-c1"},{"start":9,"end":10,"cssClass":"pl-kos"},{"start":10,"end":18,"cssClass":"pl-c1"},{"start":18,"end":19,"cssClass":"pl-kos"},{"start":19,"end":24,"cssClass":"pl-en"},{"start":24,"end":25,"cssClass":"pl-kos"},{"start":25,"end":29,"cssClass":"pl-c1"},{"start":29,"end":30,"cssClass":"pl-kos"},{"start":30,"end":31,"cssClass":"pl-kos"}],[{"start":2,"end":3,"cssClass":"pl-kos"},{"start":3,"end":4,"cssClass":"pl-kos"},{"start":4,"end":5,"cssClass":"pl-kos"}],[],[{"start":2,"end":7,"cssClass":"pl-en"},{"start":7,"end":8,"cssClass":"pl-kos"},{"start":8,"end":9,"cssClass":"pl-kos"},{"start":9,"end":10,"cssClass":"pl-kos"},{"start":11,"end":13,"cssClass":"pl-c1"},{"start":14,"end":15,"cssClass":"pl-kos"}],[{"start":4,"end":9,"cssClass":"pl-c1"},{"start":9,"end":10,"cssClass":"pl-kos"},{"start":10,"end":18,"cssClass":"pl-c1"},{"start":18,"end":19,"cssClass":"pl-kos"},{"start":19,"end":24,"cssClass":"pl-en"},{"start":24,"end":25,"cssClass":"pl-kos"},{"start":25,"end":26,"cssClass":"pl-kos"},{"start":26,"end":27,"cssClass":"pl-kos"}],[{"start":4,"end":9,"cssClass":"pl-c1"},{"start":9,"end":10,"cssClass":"pl-kos"},{"start":10,"end":18,"cssClass":"pl-c1"},{"start":18,"end":19,"cssClass":"pl-kos"},{"start":19,"end":23,"cssClass":"pl-en"},{"start":23,"end":24,"cssClass":"pl-kos"},{"start":24,"end":25,"cssClass":"pl-kos"},{"start":25,"end":26,"cssClass":"pl-kos"}],[{"start":2,"end":3,"cssClass":"pl-kos"},{"start":3,"end":4,"cssClass":"pl-kos"},{"start":4,"end":5,"cssClass":"pl-kos"}],[],[{"start":2,"end":11,"cssClass":"pl-en"},{"start":11,"end":12,"cssClass":"pl-kos"},{"start":12,"end":13,"cssClass":"pl-kos"},{"start":13,"end":14,"cssClass":"pl-kos"},{"start":15,"end":17,"cssClass":"pl-c1"},{"start":18,"end":19,"cssClass":"pl-kos"}],[{"start":4,"end":15,"cssClass":"pl-c1"},{"start":15,"end":16,"cssClass":"pl-kos"},{"start":16,"end":19,"cssClass":"pl-c1"},{"start":19,"end":20,"cssClass":"pl-kos"},{"start":20,"end":32,"cssClass":"pl-en"},{"start":32,"end":33,"cssClass":"pl-kos"},{"start":33,"end":34,"cssClass":"pl-kos"},{"start":34,"end":35,"cssClass":"pl-kos"}],[{"start":2,"end":3,"cssClass":"pl-kos"},{"start":3,"end":4,"cssClass":"pl-kos"},{"start":4,"end":5,"cssClass":"pl-kos"}],[],[{"start":2,"end":4,"cssClass":"pl-en"},{"start":4,"end":5,"cssClass":"pl-kos"},{"start":5,"end":56,"cssClass":"pl-s"},{"start":56,"end":57,"cssClass":"pl-kos"},{"start":58,"end":59,"cssClass":"pl-kos"},{"start":59,"end":60,"cssClass":"pl-kos"},{"start":61,"end":63,"cssClass":"pl-c1"},{"start":64,"end":65,"cssClass":"pl-kos"}],[{"start":4,"end":10,"cssClass":"pl-en"},{"start":10,"end":11,"cssClass":"pl-kos"}],[{"start":6,"end":33,"cssClass":"pl-s1"},{"start":33,"end":34,"cssClass":"pl-kos"},{"start":34,"end":38,"cssClass":"pl-en"},{"start":38,"end":39,"cssClass":"pl-kos"},{"start":39,"end":66,"cssClass":"pl-s1"},{"start":66,"end":67,"cssClass":"pl-kos"},{"start":68,"end":69,"cssClass":"pl-kos"},{"start":69,"end":70,"cssClass":"pl-kos"},{"start":70,"end":71,"cssClass":"pl-kos"},{"start":72,"end":77,"cssClass":"pl-c1"},{"start":77,"end":78,"cssClass":"pl-kos"}],[{"start":4,"end":5,"cssClass":"pl-kos"},{"start":5,"end":6,"cssClass":"pl-kos"},{"start":6,"end":8,"cssClass":"pl-c1"},{"start":8,"end":9,"cssClass":"pl-kos"},{"start":9,"end":14,"cssClass":"pl-en"},{"start":14,"end":15,"cssClass":"pl-kos"},{"start":15,"end":37,"cssClass":"pl-s"},{"start":37,"end":38,"cssClass":"pl-kos"},{"start":38,"end":39,"cssClass":"pl-kos"}],[{"start":2,"end":3,"cssClass":"pl-kos"},{"start":3,"end":4,"cssClass":"pl-kos"},{"start":4,"end":5,"cssClass":"pl-kos"}],[],[{"start":2,"end":4,"cssClass":"pl-en"},{"start":4,"end":5,"cssClass":"pl-kos"},{"start":5,"end":51,"cssClass":"pl-s"},{"start":51,"end":52,"cssClass":"pl-kos"},{"start":53,"end":54,"cssClass":"pl-kos"},{"start":54,"end":58,"cssClass":"pl-s1"},{"start":58,"end":59,"cssClass":"pl-kos"},{"start":60,"end":62,"cssClass":"pl-c1"},{"start":63,"end":64,"cssClass":"pl-kos"}],[{"start":4,"end":10,"cssClass":"pl-en"},{"start":10,"end":11,"cssClass":"pl-kos"},{"start":11,"end":16,"cssClass":"pl-c1"},{"start":16,"end":17,"cssClass":"pl-kos"},{"start":17,"end":25,"cssClass":"pl-c1"},{"start":25,"end":26,"cssClass":"pl-kos"},{"start":26,"end":30,"cssClass":"pl-c1"},{"start":30,"end":31,"cssClass":"pl-kos"},{"start":31,"end":37,"cssClass":"pl-c1"},{"start":37,"end":38,"cssClass":"pl-kos"},{"start":38,"end":39,"cssClass":"pl-kos"},{"start":39,"end":41,"cssClass":"pl-c1"},{"start":41,"end":42,"cssClass":"pl-kos"},{"start":42,"end":47,"cssClass":"pl-en"},{"start":47,"end":48,"cssClass":"pl-kos"},{"start":48,"end":49,"cssClass":"pl-c1"},{"start":49,"end":50,"cssClass":"pl-kos"},{"start":50,"end":51,"cssClass":"pl-kos"}],[{"start":4,"end":9,"cssClass":"pl-k"},{"start":10,"end":18,"cssClass":"pl-s1"},{"start":19,"end":20,"cssClass":"pl-c1"},{"start":21,"end":22,"cssClass":"pl-kos"}],[{"start":6,"end":7,"cssClass":"pl-kos"}],[{"start":8,"end":19,"cssClass":"pl-c1"},{"start":21,"end":34,"cssClass":"pl-s"},{"start":34,"end":35,"cssClass":"pl-kos"}],[{"start":8,"end":15,"cssClass":"pl-c1"},{"start":17,"end":59,"cssClass":"pl-s"},{"start":59,"end":60,"cssClass":"pl-kos"}],[{"start":6,"end":7,"cssClass":"pl-kos"},{"start":7,"end":8,"cssClass":"pl-kos"}],[{"start":6,"end":7,"cssClass":"pl-kos"}],[{"start":8,"end":19,"cssClass":"pl-c1"},{"start":21,"end":34,"cssClass":"pl-s"},{"start":34,"end":35,"cssClass":"pl-kos"}],[{"start":8,"end":15,"cssClass":"pl-c1"},{"start":17,"end":59,"cssClass":"pl-s"},{"start":59,"end":60,"cssClass":"pl-kos"}],[{"start":6,"end":7,"cssClass":"pl-kos"},{"start":7,"end":8,"cssClass":"pl-kos"}],[{"start":4,"end":5,"cssClass":"pl-kos"},{"start":5,"end":6,"cssClass":"pl-kos"}],[{"start":4,"end":31,"cssClass":"pl-en"},{"start":31,"end":32,"cssClass":"pl-kos"},{"start":32,"end":40,"cssClass":"pl-s1"},{"start":40,"end":41,"cssClass":"pl-kos"},{"start":42,"end":47,"cssClass":"pl-c1"},{"start":47,"end":48,"cssClass":"pl-kos"},{"start":48,"end":49,"cssClass":"pl-kos"}],[{"start":4,"end":10,"cssClass":"pl-en"},{"start":10,"end":11,"cssClass":"pl-kos"},{"start":11,"end":16,"cssClass":"pl-c1"},{"start":16,"end":17,"cssClass":"pl-kos"},{"start":17,"end":25,"cssClass":"pl-c1"},{"start":25,"end":26,"cssClass":"pl-kos"},{"start":26,"end":30,"cssClass":"pl-c1"},{"start":30,"end":31,"cssClass":"pl-kos"},{"start":31,"end":37,"cssClass":"pl-c1"},{"start":37,"end":38,"cssClass":"pl-kos"},{"start":38,"end":39,"cssClass":"pl-kos"},{"start":39,"end":41,"cssClass":"pl-c1"},{"start":41,"end":42,"cssClass":"pl-kos"},{"start":42,"end":47,"cssClass":"pl-en"},{"start":47,"end":48,"cssClass":"pl-kos"},{"start":48,"end":49,"cssClass":"pl-c1"},{"start":49,"end":50,"cssClass":"pl-kos"},{"start":50,"end":51,"cssClass":"pl-kos"}],[{"start":4,"end":10,"cssClass":"pl-en"},{"start":10,"end":11,"cssClass":"pl-kos"},{"start":11,"end":16,"cssClass":"pl-c1"},{"start":16,"end":17,"cssClass":"pl-kos"},{"start":17,"end":25,"cssClass":"pl-c1"},{"start":25,"end":26,"cssClass":"pl-kos"},{"start":26,"end":30,"cssClass":"pl-c1"},{"start":30,"end":31,"cssClass":"pl-kos"},{"start":31,"end":32,"cssClass":"pl-c1"},{"start":32,"end":33,"cssClass":"pl-kos"},{"start":33,"end":34,"cssClass":"pl-kos"},{"start":34,"end":38,"cssClass":"pl-c1"},{"start":38,"end":39,"cssClass":"pl-kos"},{"start":39,"end":40,"cssClass":"pl-kos"},{"start":40,"end":42,"cssClass":"pl-c1"},{"start":42,"end":43,"cssClass":"pl-kos"},{"start":43,"end":47,"cssClass":"pl-c1"},{"start":47,"end":48,"cssClass":"pl-kos"},{"start":48,"end":53,"cssClass":"pl-en"},{"start":53,"end":54,"cssClass":"pl-kos"},{"start":54,"end":62,"cssClass":"pl-s1"},{"start":62,"end":63,"cssClass":"pl-kos"},{"start":63,"end":64,"cssClass":"pl-c1"},{"start":64,"end":65,"cssClass":"pl-kos"},{"start":65,"end":66,"cssClass":"pl-kos"},{"start":66,"end":67,"cssClass":"pl-kos"}],[{"start":4,"end":10,"cssClass":"pl-en"},{"start":10,"end":11,"cssClass":"pl-kos"},{"start":11,"end":16,"cssClass":"pl-c1"},{"start":16,"end":17,"cssClass":"pl-kos"},{"start":17,"end":25,"cssClass":"pl-c1"},{"start":25,"end":26,"cssClass":"pl-kos"},{"start":26,"end":30,"cssClass":"pl-c1"},{"start":30,"end":31,"cssClass":"pl-kos"},{"start":31,"end":32,"cssClass":"pl-c1"},{"start":32,"end":33,"cssClass":"pl-kos"},{"start":33,"end":34,"cssClass":"pl-kos"},{"start":34,"end":38,"cssClass":"pl-c1"},{"start":38,"end":39,"cssClass":"pl-kos"},{"start":39,"end":40,"cssClass":"pl-kos"},{"start":40,"end":42,"cssClass":"pl-c1"},{"start":42,"end":43,"cssClass":"pl-kos"},{"start":43,"end":48,"cssClass":"pl-en"},{"start":48,"end":49,"cssClass":"pl-kos"},{"start":49,"end":75,"cssClass":"pl-s"},{"start":75,"end":76,"cssClass":"pl-kos"},{"start":76,"end":77,"cssClass":"pl-kos"}],[{"start":4,"end":9,"cssClass":"pl-c1"},{"start":9,"end":10,"cssClass":"pl-kos"},{"start":10,"end":17,"cssClass":"pl-en"},{"start":17,"end":18,"cssClass":"pl-kos"},{"start":18,"end":44,"cssClass":"pl-s"},{"start":44,"end":45,"cssClass":"pl-kos"},{"start":46,"end":47,"cssClass":"pl-kos"},{"start":47,"end":48,"cssClass":"pl-kos"},{"start":49,"end":51,"cssClass":"pl-c1"},{"start":52,"end":53,"cssClass":"pl-kos"}],[{"start":6,"end":12,"cssClass":"pl-en"},{"start":12,"end":13,"cssClass":"pl-kos"}],[{"start":8,"end":19,"cssClass":"pl-c1"},{"start":19,"end":20,"cssClass":"pl-kos"},{"start":20,"end":23,"cssClass":"pl-c1"}],[{"start":10,"end":11,"cssClass":"pl-kos"},{"start":11,"end":21,"cssClass":"pl-en"},{"start":21,"end":22,"cssClass":"pl-kos"},{"start":22,"end":49,"cssClass":"pl-s"},{"start":49,"end":50,"cssClass":"pl-kos"},{"start":51,"end":56,"cssClass":"pl-c1"},{"start":56,"end":57,"cssClass":"pl-kos"},{"start":57,"end":65,"cssClass":"pl-c1"},{"start":65,"end":66,"cssClass":"pl-kos"},{"start":66,"end":70,"cssClass":"pl-c1"},{"start":70,"end":71,"cssClass":"pl-kos"},{"start":71,"end":72,"cssClass":"pl-c1"},{"start":72,"end":73,"cssClass":"pl-kos"},{"start":73,"end":74,"cssClass":"pl-kos"},{"start":74,"end":76,"cssClass":"pl-c1"},{"start":76,"end":77,"cssClass":"pl-kos"}],[{"start":6,"end":7,"cssClass":"pl-kos"},{"start":7,"end":8,"cssClass":"pl-kos"},{"start":8,"end":10,"cssClass":"pl-c1"},{"start":10,"end":11,"cssClass":"pl-kos"},{"start":11,"end":13,"cssClass":"pl-c1"},{"start":13,"end":14,"cssClass":"pl-kos"},{"start":14,"end":18,"cssClass":"pl-c1"},{"start":18,"end":19,"cssClass":"pl-kos"}],[{"start":6,"end":10,"cssClass":"pl-s1"},{"start":10,"end":11,"cssClass":"pl-kos"},{"start":11,"end":12,"cssClass":"pl-kos"},{"start":12,"end":13,"cssClass":"pl-kos"}],[{"start":4,"end":5,"cssClass":"pl-kos"},{"start":5,"end":6,"cssClass":"pl-kos"},{"start":6,"end":7,"cssClass":"pl-kos"}],[{"start":2,"end":3,"cssClass":"pl-kos"},{"start":3,"end":4,"cssClass":"pl-kos"},{"start":4,"end":5,"cssClass":"pl-kos"}],[],[{"start":2,"end":4,"cssClass":"pl-en"},{"start":4,"end":5,"cssClass":"pl-kos"},{"start":5,"end":53,"cssClass":"pl-s"},{"start":53,"end":54,"cssClass":"pl-kos"},{"start":55,"end":56,"cssClass":"pl-kos"},{"start":56,"end":60,"cssClass":"pl-s1"},{"start":60,"end":61,"cssClass":"pl-kos"},{"start":62,"end":64,"cssClass":"pl-c1"},{"start":65,"end":66,"cssClass":"pl-kos"}],[{"start":4,"end":9,"cssClass":"pl-c1"},{"start":9,"end":10,"cssClass":"pl-kos"},{"start":10,"end":18,"cssClass":"pl-c1"},{"start":18,"end":19,"cssClass":"pl-kos"},{"start":19,"end":23,"cssClass":"pl-c1"},{"start":23,"end":24,"cssClass":"pl-kos"},{"start":24,"end":25,"cssClass":"pl-c1"},{"start":25,"end":26,"cssClass":"pl-kos"},{"start":26,"end":27,"cssClass":"pl-kos"},{"start":27,"end":38,"cssClass":"pl-en"},{"start":38,"end":39,"cssClass":"pl-kos"},{"start":39,"end":49,"cssClass":"pl-s"},{"start":49,"end":50,"cssClass":"pl-kos"},{"start":51,"end":52,"cssClass":"pl-kos"},{"start":52,"end":53,"cssClass":"pl-kos"},{"start":54,"end":56,"cssClass":"pl-c1"},{"start":57,"end":58,"cssClass":"pl-kos"}],[{"start":6,"end":12,"cssClass":"pl-en"},{"start":12,"end":13,"cssClass":"pl-kos"}],[{"start":8,"end":19,"cssClass":"pl-c1"},{"start":19,"end":20,"cssClass":"pl-kos"},{"start":20,"end":23,"cssClass":"pl-c1"}],[{"start":10,"end":11,"cssClass":"pl-kos"},{"start":11,"end":21,"cssClass":"pl-en"},{"start":21,"end":22,"cssClass":"pl-kos"},{"start":22,"end":40,"cssClass":"pl-s"},{"start":40,"end":41,"cssClass":"pl-kos"},{"start":42,"end":47,"cssClass":"pl-c1"},{"start":47,"end":48,"cssClass":"pl-kos"},{"start":48,"end":56,"cssClass":"pl-c1"},{"start":56,"end":57,"cssClass":"pl-kos"},{"start":57,"end":61,"cssClass":"pl-c1"},{"start":61,"end":62,"cssClass":"pl-kos"},{"start":62,"end":63,"cssClass":"pl-c1"},{"start":63,"end":64,"cssClass":"pl-kos"},{"start":64,"end":65,"cssClass":"pl-kos"},{"start":65,"end":67,"cssClass":"pl-c1"},{"start":67,"end":68,"cssClass":"pl-kos"},{"start":69,"end":83,"cssClass":"pl-s"},{"start":83,"end":84,"cssClass":"pl-kos"}],[{"start":6,"end":7,"cssClass":"pl-kos"},{"start":7,"end":8,"cssClass":"pl-kos"},{"start":8,"end":10,"cssClass":"pl-c1"},{"start":10,"end":11,"cssClass":"pl-kos"},{"start":11,"end":13,"cssClass":"pl-c1"},{"start":13,"end":14,"cssClass":"pl-kos"},{"start":14,"end":18,"cssClass":"pl-c1"},{"start":18,"end":19,"cssClass":"pl-kos"}],[{"start":6,"end":10,"cssClass":"pl-s1"},{"start":10,"end":11,"cssClass":"pl-kos"},{"start":11,"end":12,"cssClass":"pl-kos"},{"start":12,"end":13,"cssClass":"pl-kos"}],[{"start":4,"end":5,"cssClass":"pl-kos"},{"start":5,"end":6,"cssClass":"pl-kos"},{"start":6,"end":7,"cssClass":"pl-kos"}],[{"start":4,"end":9,"cssClass":"pl-c1"},{"start":9,"end":10,"cssClass":"pl-kos"},{"start":10,"end":18,"cssClass":"pl-c1"},{"start":18,"end":19,"cssClass":"pl-kos"},{"start":19,"end":23,"cssClass":"pl-c1"},{"start":23,"end":24,"cssClass":"pl-kos"},{"start":24,"end":25,"cssClass":"pl-c1"},{"start":25,"end":26,"cssClass":"pl-kos"},{"start":26,"end":27,"cssClass":"pl-kos"},{"start":27,"end":31,"cssClass":"pl-en"},{"start":31,"end":32,"cssClass":"pl-kos"},{"start":32,"end":42,"cssClass":"pl-s"},{"start":42,"end":43,"cssClass":"pl-kos"},{"start":44,"end":46,"cssClass":"pl-c1"},{"start":46,"end":47,"cssClass":"pl-kos"},{"start":47,"end":48,"cssClass":"pl-kos"}],[{"start":2,"end":3,"cssClass":"pl-kos"},{"start":3,"end":4,"cssClass":"pl-kos"},{"start":4,"end":5,"cssClass":"pl-kos"}],[],[{"start":2,"end":4,"cssClass":"pl-en"},{"start":4,"end":5,"cssClass":"pl-kos"},{"start":5,"end":51,"cssClass":"pl-s"},{"start":51,"end":52,"cssClass":"pl-kos"},{"start":53,"end":54,"cssClass":"pl-kos"},{"start":54,"end":58,"cssClass":"pl-s1"},{"start":58,"end":59,"cssClass":"pl-kos"},{"start":60,"end":62,"cssClass":"pl-c1"},{"start":63,"end":64,"cssClass":"pl-kos"}],[{"start":4,"end":9,"cssClass":"pl-c1"},{"start":9,"end":10,"cssClass":"pl-kos"},{"start":10,"end":18,"cssClass":"pl-c1"},{"start":18,"end":19,"cssClass":"pl-kos"},{"start":19,"end":23,"cssClass":"pl-c1"},{"start":23,"end":24,"cssClass":"pl-kos"},{"start":24,"end":25,"cssClass":"pl-c1"},{"start":25,"end":26,"cssClass":"pl-kos"},{"start":26,"end":27,"cssClass":"pl-kos"},{"start":27,"end":38,"cssClass":"pl-en"},{"start":38,"end":39,"cssClass":"pl-kos"},{"start":39,"end":47,"cssClass":"pl-s"},{"start":47,"end":48,"cssClass":"pl-kos"},{"start":49,"end":50,"cssClass":"pl-kos"},{"start":50,"end":51,"cssClass":"pl-kos"},{"start":52,"end":54,"cssClass":"pl-c1"},{"start":55,"end":56,"cssClass":"pl-kos"}],[{"start":6,"end":12,"cssClass":"pl-en"},{"start":12,"end":13,"cssClass":"pl-kos"}],[{"start":8,"end":19,"cssClass":"pl-c1"},{"start":19,"end":20,"cssClass":"pl-kos"},{"start":20,"end":23,"cssClass":"pl-c1"}],[{"start":10,"end":11,"cssClass":"pl-kos"},{"start":11,"end":21,"cssClass":"pl-en"},{"start":21,"end":22,"cssClass":"pl-kos"},{"start":22,"end":40,"cssClass":"pl-s"},{"start":40,"end":41,"cssClass":"pl-kos"},{"start":42,"end":47,"cssClass":"pl-c1"},{"start":47,"end":48,"cssClass":"pl-kos"},{"start":48,"end":56,"cssClass":"pl-c1"},{"start":56,"end":57,"cssClass":"pl-kos"},{"start":57,"end":61,"cssClass":"pl-c1"},{"start":61,"end":62,"cssClass":"pl-kos"},{"start":62,"end":63,"cssClass":"pl-c1"},{"start":63,"end":64,"cssClass":"pl-kos"},{"start":64,"end":65,"cssClass":"pl-kos"},{"start":65,"end":67,"cssClass":"pl-c1"},{"start":67,"end":68,"cssClass":"pl-kos"},{"start":69,"end":78,"cssClass":"pl-s"},{"start":78,"end":79,"cssClass":"pl-kos"},{"start":80,"end":96,"cssClass":"pl-s"},{"start":96,"end":97,"cssClass":"pl-kos"}],[{"start":6,"end":7,"cssClass":"pl-kos"},{"start":7,"end":8,"cssClass":"pl-kos"},{"start":8,"end":10,"cssClass":"pl-c1"},{"start":10,"end":11,"cssClass":"pl-kos"},{"start":11,"end":13,"cssClass":"pl-c1"},{"start":13,"end":14,"cssClass":"pl-kos"},{"start":14,"end":18,"cssClass":"pl-c1"},{"start":18,"end":19,"cssClass":"pl-kos"}],[{"start":6,"end":10,"cssClass":"pl-s1"},{"start":10,"end":11,"cssClass":"pl-kos"},{"start":11,"end":12,"cssClass":"pl-kos"},{"start":12,"end":13,"cssClass":"pl-kos"}],[{"start":4,"end":5,"cssClass":"pl-kos"},{"start":5,"end":6,"cssClass":"pl-kos"},{"start":6,"end":7,"cssClass":"pl-kos"}],[{"start":4,"end":9,"cssClass":"pl-c1"},{"start":9,"end":10,"cssClass":"pl-kos"},{"start":10,"end":18,"cssClass":"pl-c1"},{"start":18,"end":19,"cssClass":"pl-kos"},{"start":19,"end":23,"cssClass":"pl-c1"},{"start":23,"end":24,"cssClass":"pl-kos"},{"start":24,"end":25,"cssClass":"pl-c1"},{"start":25,"end":26,"cssClass":"pl-kos"},{"start":26,"end":27,"cssClass":"pl-kos"},{"start":27,"end":31,"cssClass":"pl-en"},{"start":31,"end":32,"cssClass":"pl-kos"},{"start":32,"end":40,"cssClass":"pl-s"},{"start":40,"end":41,"cssClass":"pl-kos"},{"start":42,"end":45,"cssClass":"pl-k"},{"start":46,"end":51,"cssClass":"pl-v"},{"start":51,"end":52,"cssClass":"pl-kos"},{"start":52,"end":68,"cssClass":"pl-s"},{"start":68,"end":69,"cssClass":"pl-kos"},{"start":69,"end":70,"cssClass":"pl-kos"},{"start":70,"end":71,"cssClass":"pl-kos"}],[{"start":2,"end":3,"cssClass":"pl-kos"},{"start":3,"end":4,"cssClass":"pl-kos"},{"start":4,"end":5,"cssClass":"pl-kos"}],[],[{"start":2,"end":4,"cssClass":"pl-en"},{"start":4,"end":5,"cssClass":"pl-kos"},{"start":5,"end":53,"cssClass":"pl-s"},{"start":53,"end":54,"cssClass":"pl-kos"},{"start":55,"end":56,"cssClass":"pl-kos"},{"start":56,"end":60,"cssClass":"pl-s1"},{"start":60,"end":61,"cssClass":"pl-kos"},{"start":62,"end":64,"cssClass":"pl-c1"},{"start":65,"end":66,"cssClass":"pl-kos"}],[{"start":4,"end":9,"cssClass":"pl-c1"},{"start":9,"end":10,"cssClass":"pl-kos"},{"start":10,"end":18,"cssClass":"pl-c1"},{"start":18,"end":19,"cssClass":"pl-kos"},{"start":19,"end":23,"cssClass":"pl-c1"},{"start":23,"end":24,"cssClass":"pl-kos"},{"start":24,"end":25,"cssClass":"pl-c1"},{"start":25,"end":26,"cssClass":"pl-kos"},{"start":26,"end":27,"cssClass":"pl-kos"},{"start":27,"end":38,"cssClass":"pl-en"},{"start":38,"end":39,"cssClass":"pl-kos"},{"start":39,"end":49,"cssClass":"pl-s"},{"start":49,"end":50,"cssClass":"pl-kos"},{"start":51,"end":52,"cssClass":"pl-kos"},{"start":52,"end":53,"cssClass":"pl-kos"},{"start":54,"end":56,"cssClass":"pl-c1"},{"start":57,"end":58,"cssClass":"pl-kos"}],[{"start":6,"end":12,"cssClass":"pl-en"},{"start":12,"end":13,"cssClass":"pl-kos"}],[{"start":8,"end":19,"cssClass":"pl-c1"},{"start":19,"end":20,"cssClass":"pl-kos"},{"start":20,"end":23,"cssClass":"pl-c1"}],[{"start":10,"end":11,"cssClass":"pl-kos"},{"start":11,"end":21,"cssClass":"pl-en"},{"start":21,"end":22,"cssClass":"pl-kos"},{"start":22,"end":40,"cssClass":"pl-s"},{"start":40,"end":41,"cssClass":"pl-kos"},{"start":42,"end":47,"cssClass":"pl-c1"},{"start":47,"end":48,"cssClass":"pl-kos"},{"start":48,"end":56,"cssClass":"pl-c1"},{"start":56,"end":57,"cssClass":"pl-kos"},{"start":57,"end":61,"cssClass":"pl-c1"},{"start":61,"end":62,"cssClass":"pl-kos"},{"start":62,"end":63,"cssClass":"pl-c1"},{"start":63,"end":64,"cssClass":"pl-kos"},{"start":64,"end":65,"cssClass":"pl-kos"},{"start":65,"end":67,"cssClass":"pl-c1"},{"start":67,"end":68,"cssClass":"pl-kos"},{"start":69,"end":80,"cssClass":"pl-s"},{"start":80,"end":81,"cssClass":"pl-kos"}],[{"start":6,"end":7,"cssClass":"pl-kos"},{"start":7,"end":8,"cssClass":"pl-kos"},{"start":8,"end":10,"cssClass":"pl-c1"},{"start":10,"end":11,"cssClass":"pl-kos"},{"start":11,"end":13,"cssClass":"pl-c1"},{"start":13,"end":14,"cssClass":"pl-kos"},{"start":14,"end":18,"cssClass":"pl-c1"},{"start":18,"end":19,"cssClass":"pl-kos"}],[{"start":6,"end":10,"cssClass":"pl-s1"},{"start":10,"end":11,"cssClass":"pl-kos"},{"start":11,"end":12,"cssClass":"pl-kos"},{"start":12,"end":13,"cssClass":"pl-kos"}],[{"start":4,"end":5,"cssClass":"pl-kos"},{"start":5,"end":6,"cssClass":"pl-kos"},{"start":6,"end":7,"cssClass":"pl-kos"}],[{"start":4,"end":9,"cssClass":"pl-c1"},{"start":9,"end":10,"cssClass":"pl-kos"},{"start":10,"end":18,"cssClass":"pl-c1"},{"start":18,"end":19,"cssClass":"pl-kos"},{"start":19,"end":23,"cssClass":"pl-c1"},{"start":23,"end":24,"cssClass":"pl-kos"},{"start":24,"end":25,"cssClass":"pl-c1"},{"start":25,"end":26,"cssClass":"pl-kos"},{"start":26,"end":27,"cssClass":"pl-kos"},{"start":27,"end":31,"cssClass":"pl-en"},{"start":31,"end":32,"cssClass":"pl-kos"},{"start":32,"end":42,"cssClass":"pl-s"},{"start":42,"end":43,"cssClass":"pl-kos"},{"start":43,"end":44,"cssClass":"pl-kos"}],[{"start":2,"end":3,"cssClass":"pl-kos"},{"start":3,"end":4,"cssClass":"pl-kos"},{"start":4,"end":5,"cssClass":"pl-kos"}],[{"start":0,"end":1,"cssClass":"pl-kos"},{"start":1,"end":2,"cssClass":"pl-kos"},{"start":2,"end":3,"cssClass":"pl-kos"}]],"csv":null,"csvError":null,"dependabotInfo":{"showConfigurationBanner":false,"configFilePath":null,"networkDependabotPath":"/Jayneey/alx-backend/network/updates","dismissConfigurationNoticePath":"/settings/dismiss-notice/dependabot_configuration_notice","configurationNoticeDismissed":false,"repoAlertsPath":"/Jayneey/alx-backend/security/dependabot","repoSecurityAndAnalysisPath":"/Jayneey/alx-backend/settings/security_analysis","repoOwnerIsOrg":false,"currentUserCanAdminRepo":false},"displayName":"8-job.test.js","displayUrl":"https://github.com/Jayneey/alx-backend/blob/master/0x03-queuing_system_in_js/8-job.test.js?raw=true","headerInfo":{"blobSize":"2.58 KB","deleteInfo":{"deleteTooltip":"Fork this repository and delete the file"},"editInfo":{"editTooltip":"Fork this repository and edit the file"},"ghDesktopPath":"https://desktop.github.com","gitLfsPath":null,"onBranch":true,"shortPath":"6999140","siteNavLoginPath":"/login?return_to=https%3A%2F%2Fgithub.com%2FJayneey%2Falx-backend%2Fblob%2Fmaster%2F0x03-queuing_system_in_js%2F8-job.test.js","isCSV":false,"isRichtext":false,"toc":null,"lineInfo":{"truncatedLoc":"87","truncatedSloc":"78"},"mode":"executable file"},"image":false,"isCodeownersFile":null,"isPlain":false,"isValidLegacyIssueTemplate":false,"issueTemplateHelpUrl":"https://docs.github.com/articles/about-issue-and-pull-request-templates","issueTemplate":null,"discussionTemplate":null,"language":"JavaScript","languageID":183,"large":false,"loggedIn":true,"newDiscussionPath":"/Jayneey/alx-backend/discussions/new","newIssuePath":"/Jayneey/alx-backend/issues/new","planSupportInfo":{"repoIsFork":null,"repoOwnedByCurrentUser":null,"requestFullPath":"/Jayneey/alx-backend/blob/master/0x03-queuing_system_in_js/8-job.test.js","showFreeOrgGatedFeatureMessage":null,"showPlanSupportBanner":null,"upgradeDataAttributes":null,"upgradePath":null},"publishBannersInfo":{"dismissActionNoticePath":"/settings/dismiss-notice/publish_action_from_dockerfile","dismissStackNoticePath":"/settings/dismiss-notice/publish_stack_from_file","releasePath":"/Jayneey/alx-backend/releases/new?marketplace=true","showPublishActionBanner":false,"showPublishStackBanner":false},"rawBlobUrl":"https://github.com/Jayneey/alx-backend/raw/master/0x03-queuing_system_in_js/8-job.test.js","renderImageOrRaw":false,"richText":null,"renderedFileInfo":null,"shortPath":null,"tabSize":8,"topBannersInfo":{"overridingGlobalFundingFile":false,"globalPreferredFundingPath":null,"repoOwner":"Jayneey","repoName":"alx-backend","showInvalidCitationWarning":false,"citationHelpUrl":"https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-on-github/about-citation-files","showDependabotConfigurationBanner":false,"actionsOnboardingTip":null},"truncated":false,"viewable":true,"workflowRedirectUrl":null,"symbols":{"timed_out":false,"not_analyzed":false,"symbols":[]}},"copilotInfo":{"documentationUrl":"https://docs.github.com/copilot/overview-of-github-copilot/about-github-copilot-for-individuals","notices":{"codeViewPopover":{"dismissed":false,"dismissPath":"/settings/dismiss-notice/code_view_copilot_popover"}},"userAccess":{"accessAllowed":false,"hasSubscriptionEnded":false,"orgHasCFBAccess":false,"userHasCFIAccess":false,"userHasOrgs":false,"userIsOrgAdmin":false,"userIsOrgMember":false,"business":null,"featureRequestInfo":null}},"copilotAccessAllowed":false,"csrf_tokens":{"/Jayneey/alx-backend/branches":{"post":"iOGyaRsEF-KJyomxk9whESxyDBGwHD967AHuwH3yHdkiiAb33D53pewSV0DERRTrNNiuzGjPF2FshVeuwZgTsQ"},"/repos/preferences":{"post":"59wOHTYXXkrFPpp8gl41PuYY67APg5cPgI1OzbhfJBAFGoaXu4cFPbE9yZ38gPz4ay4aFJ07vfdnQ9A07iKrAA"}}},"title":"alx-backend/0x03-queuing_system_in_js/8-job.test.js at master · Jayneey/alx-backend"}