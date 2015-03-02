/**
 * Created by Adam on 2015.02.14..
 */
var assert = require('chai').assert;
var es = require('event-stream');
var Promise = require('bluebird');
var datastorage = require('../lib/datastorage');
var util = require('util');

var datas = [
    ['Test','Row','In','GFS'],
    ['Test','Row','In','GFS'],
    ['Test','Row','In','GFS'],
    ['Test','Row','In','GFS']
];

var filename = 'file-for-tests.txt';

function createTestDatas(gfs) {

    var gfsWriteStream = gfs.createWriteStream({
        filename:filename,
        mode:'w',
        content_type:'plain/text',
        metadata:{
            test:'test-metadata'
        }
    });

    return new Promise(function(resolve,reject){
        es.readArray(datas)
            .pipe(es.stringify())
            .pipe(gfsWriteStream)
            .on('close',function(){
                resolve();
            })
            .on('error',function(err){
                reject(err);
            });
    });
}

describe('DataStorage Tests',function(){

    var host = '127.0.0.1';
    var db   = 'gridfs-test';

    var store = datastorage();

    before(function(done){
        store.connect(host,db)
            .then(function(){
                return createTestDatas(store.gfs);
            })
            .then(function(){
                done();
            })
            .done();
    });

    after(function(done){
        store.gfs.files.drop(function(err){
            if (err) {
                throw err;
            } else {
                store.disconnect()
                    .then(done)
                    .done();
            }
        })
    });

    describe('Connection test',function(){
        it('state equals connected',function(){
            var state = store.state(),
                code = state.code,
                text = state.text;

            assert.equal(text,'connected');
            assert.equal(code,1);
        });
    });

    describe('meta test',function(){
        it('has some metadata',function(done){
            store.metaAsync(filename)
                .then(function(meta){
                    assert.equal(meta.metadata.test,'test-metadata');
                    done();
                })
                .done();
        })
    });

    describe('stream test',function(){
        it('read a stream from gfs',function(done) {
            var ReadableStream = require('stream').Readable;
            store.streamAsync(filename)
                .then(function (stream) {
                    assert.isNotNull(stream);
                    assert.instanceOf(stream, ReadableStream);

                    stream
                        .pipe(es.split())
                        .pipe(es.parse())
                        .pipe(es.writeArray(function(err,arr){
                            assert.deepEqual(arr,datas);
                            done();
                        }));
                })
                .done();
        })
    });

    describe('read test',function(){
        it('read metadata and stream',function(done){

            var ReadableStream = require('stream').Readable;

            store.readAsync(filename)
                .then(function(res){
                    assert.instanceOf(res[1],ReadableStream);
                    assert.equal(res[0].metadata.test,'test-metadata');
                    done();
                })
                .done();
        });
    });

});