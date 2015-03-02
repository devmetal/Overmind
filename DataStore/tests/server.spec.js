/**
 * Created by Adam on 2015.02.11..
 */
var assert = require('chai').assert;
var io = require('socket.io-client');

describe('shake-it test',function(){
    it('shake-it request has too be response',function(done){
        var socket = io('http://localhost:3333');
        socket.emit('welcome',{hello:'server'});
        socket.on('welcome',function(data){
            assert.deepEqual(data,{
                msg:'Welcome!',
                data:{
                    hello:'server'
                }
            });
            socket.close();
            done();
        });
    });
});