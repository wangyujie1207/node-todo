const db = require('../db.js');
const fs = require('fs');
jest.mock('fs');

describe('db', () => {
    afterEach(() => {
        fs.clearMocks();
    });
    it('can read', async () => {
        expect(db.read instanceof Function).toBeTruthy();
        const data = [{title: 'hi', done: true}]
        fs.setReadFileMock('/xxx', null, JSON.stringify(data));
        const list = await db.read('/xxx');
        expect(list).toStrictEqual(data);
    });
    it('can write', async () => {
        expect(db.read instanceof Function).toBe(true);
        let fakeFile = '';
        fs.setWriteFileMock('/yyy', (path, data, callback) => {
            fakeFile = data;
            callback(null);
        });
        const list = [{title: '见欧阳娜娜', done: true}, {title: '见迪丽热巴', done: true}]
        await db.write(list, '/yyy');
        expect(fakeFile).toBe(JSON.stringify(list) + '\n')
    });
});