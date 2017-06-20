'use strict'

var commands = {
  "append": {
    "arity": 3,
    "flags": [
      "write",
      "denyoom"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "asking": {
    "arity": 1,
    "flags": [
      "fast"
    ],
    "keyStart": 0,
    "keyStop": 0,
    "step": 0
  },
  "auth": {
    "arity": 2,
    "flags": [
      "noscript",
      "loading",
      "stale",
      "fast"
    ],
    "keyStart": 0,
    "keyStop": 0,
    "step": 0
  },
  "bgrewriteaof": {
    "arity": 1,
    "flags": [
      "admin"
    ],
    "keyStart": 0,
    "keyStop": 0,
    "step": 0
  },
  "bgsave": {
    "arity": -1,
    "flags": [
      "admin"
    ],
    "keyStart": 0,
    "keyStop": 0,
    "step": 0
  },
  "bitcount": {
    "arity": -2,
    "flags": [
      "readonly"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "bitfield": {
    "arity": -2,
    "flags": [
      "write",
      "denyoom"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "bitop": {
    "arity": -4,
    "flags": [
      "write",
      "denyoom"
    ],
    "keyStart": 2,
    "keyStop": -1,
    "step": 1
  },
  "bitpos": {
    "arity": -3,
    "flags": [
      "readonly"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "blpop": {
    "arity": -3,
    "flags": [
      "write",
      "noscript"
    ],
    "keyStart": 1,
    "keyStop": -2,
    "step": 1
  },
  "brpop": {
    "arity": -3,
    "flags": [
      "write",
      "noscript"
    ],
    "keyStart": 1,
    "keyStop": -2,
    "step": 1
  },
  "brpoplpush": {
    "arity": 4,
    "flags": [
      "write",
      "denyoom",
      "noscript"
    ],
    "keyStart": 1,
    "keyStop": 2,
    "step": 1
  },
  "client": {
    "arity": -2,
    "flags": [
      "admin",
      "noscript"
    ],
    "keyStart": 0,
    "keyStop": 0,
    "step": 0
  },
  "cluster": {
    "arity": -2,
    "flags": [
      "admin"
    ],
    "keyStart": 0,
    "keyStop": 0,
    "step": 0
  },
  "command": {
    "arity": 1,
    "flags": [
      "loading",
      "stale"
    ],
    "keyStart": 0,
    "keyStop": 0,
    "step": 0
  },
  "config": {
    "arity": -2,
    "flags": [
      "admin",
      "loading",
      "stale"
    ],
    "keyStart": 0,
    "keyStop": 0,
    "step": 0
  },
  "dbsize": {
    "arity": 1,
    "flags": [
      "readonly",
      "fast"
    ],
    "keyStart": 0,
    "keyStop": 0,
    "step": 0
  },
  "debug": {
    "arity": -1,
    "flags": [
      "admin",
      "noscript"
    ],
    "keyStart": 0,
    "keyStop": 0,
    "step": 0
  },
  "decr": {
    "arity": 2,
    "flags": [
      "write",
      "denyoom",
      "fast"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "decrby": {
    "arity": 3,
    "flags": [
      "write",
      "denyoom",
      "fast"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "del": {
    "arity": -2,
    "flags": [
      "write"
    ],
    "keyStart": 1,
    "keyStop": -1,
    "step": 1
  },
  "discard": {
    "arity": 1,
    "flags": [
      "noscript",
      "fast"
    ],
    "keyStart": 0,
    "keyStop": 0,
    "step": 0
  },
  "dump": {
    "arity": 2,
    "flags": [
      "readonly"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "echo": {
    "arity": 2,
    "flags": [
      "fast"
    ],
    "keyStart": 0,
    "keyStop": 0,
    "step": 0
  },
  "eval": {
    "arity": -3,
    "flags": [
      "noscript",
      "movablekeys"
    ],
    "keyStart": 0,
    "keyStop": 0,
    "step": 0
  },
  "evalsha": {
    "arity": -3,
    "flags": [
      "noscript",
      "movablekeys"
    ],
    "keyStart": 0,
    "keyStop": 0,
    "step": 0
  },
  "exec": {
    "arity": 1,
    "flags": [
      "noscript",
      "skip_monitor"
    ],
    "keyStart": 0,
    "keyStop": 0,
    "step": 0
  },
  "exists": {
    "arity": -2,
    "flags": [
      "readonly",
      "fast"
    ],
    "keyStart": 1,
    "keyStop": -1,
    "step": 1
  },
  "expire": {
    "arity": 3,
    "flags": [
      "write",
      "fast"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "expireat": {
    "arity": 3,
    "flags": [
      "write",
      "fast"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "flushall": {
    "arity": -1,
    "flags": [
      "write"
    ],
    "keyStart": 0,
    "keyStop": 0,
    "step": 0
  },
  "flushdb": {
    "arity": -1,
    "flags": [
      "write"
    ],
    "keyStart": 0,
    "keyStop": 0,
    "step": 0
  },
  "geoadd": {
    "arity": -5,
    "flags": [
      "write",
      "denyoom"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "geodist": {
    "arity": -4,
    "flags": [
      "readonly"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "geohash": {
    "arity": -2,
    "flags": [
      "readonly"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "geopos": {
    "arity": -2,
    "flags": [
      "readonly"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "georadius": {
    "arity": -6,
    "flags": [
      "write"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "georadiusbymember": {
    "arity": -5,
    "flags": [
      "write"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "get": {
    "arity": 2,
    "flags": [
      "readonly",
      "fast"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "getbit": {
    "arity": 3,
    "flags": [
      "readonly",
      "fast"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "getrange": {
    "arity": 4,
    "flags": [
      "readonly"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "getset": {
    "arity": 3,
    "flags": [
      "write",
      "denyoom"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "hdel": {
    "arity": -3,
    "flags": [
      "write",
      "fast"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "hexists": {
    "arity": 3,
    "flags": [
      "readonly",
      "fast"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "hget": {
    "arity": 3,
    "flags": [
      "readonly",
      "fast"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "hgetall": {
    "arity": 2,
    "flags": [
      "readonly"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "hincrby": {
    "arity": 4,
    "flags": [
      "write",
      "denyoom",
      "fast"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "hincrbyfloat": {
    "arity": 4,
    "flags": [
      "write",
      "denyoom",
      "fast"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "hkeys": {
    "arity": 2,
    "flags": [
      "readonly",
      "sort_for_script"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "hlen": {
    "arity": 2,
    "flags": [
      "readonly",
      "fast"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "hmget": {
    "arity": -3,
    "flags": [
      "readonly"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "hmset": {
    "arity": -4,
    "flags": [
      "write",
      "denyoom"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "host:": {
    "arity": -1,
    "flags": [
      "loading",
      "stale"
    ],
    "keyStart": 0,
    "keyStop": 0,
    "step": 0
  },
  "hscan": {
    "arity": -3,
    "flags": [
      "readonly",
      "random"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "hset": {
    "arity": 4,
    "flags": [
      "write",
      "denyoom",
      "fast"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "hsetnx": {
    "arity": 4,
    "flags": [
      "write",
      "denyoom",
      "fast"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "hstrlen": {
    "arity": 3,
    "flags": [
      "readonly",
      "fast"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "hvals": {
    "arity": 2,
    "flags": [
      "readonly",
      "sort_for_script"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "incr": {
    "arity": 2,
    "flags": [
      "write",
      "denyoom",
      "fast"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "incrby": {
    "arity": 3,
    "flags": [
      "write",
      "denyoom",
      "fast"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "incrbyfloat": {
    "arity": 3,
    "flags": [
      "write",
      "denyoom",
      "fast"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "info": {
    "arity": -1,
    "flags": [
      "loading",
      "stale"
    ],
    "keyStart": 0,
    "keyStop": 0,
    "step": 0
  },
  "keys": {
    "arity": 2,
    "flags": [
      "readonly",
      "sort_for_script"
    ],
    "keyStart": 0,
    "keyStop": 0,
    "step": 0
  },
  "lastsave": {
    "arity": 1,
    "flags": [
      "random",
      "fast"
    ],
    "keyStart": 0,
    "keyStop": 0,
    "step": 0
  },
  "latency": {
    "arity": -2,
    "flags": [
      "admin",
      "noscript",
      "loading",
      "stale"
    ],
    "keyStart": 0,
    "keyStop": 0,
    "step": 0
  },
  "lindex": {
    "arity": 3,
    "flags": [
      "readonly"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "linsert": {
    "arity": 5,
    "flags": [
      "write",
      "denyoom"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "llen": {
    "arity": 2,
    "flags": [
      "readonly",
      "fast"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "lpop": {
    "arity": 2,
    "flags": [
      "write",
      "fast"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "lpush": {
    "arity": -3,
    "flags": [
      "write",
      "denyoom",
      "fast"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "lpushx": {
    "arity": -3,
    "flags": [
      "write",
      "denyoom",
      "fast"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "lrange": {
    "arity": 4,
    "flags": [
      "readonly"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "lrem": {
    "arity": 4,
    "flags": [
      "write"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "lset": {
    "arity": 4,
    "flags": [
      "write",
      "denyoom"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "ltrim": {
    "arity": 4,
    "flags": [
      "write"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "memory": {
    "arity": -2,
    "flags": [
      "readonly"
    ],
    "keyStart": 0,
    "keyStop": 0,
    "step": 0
  },
  "mget": {
    "arity": -2,
    "flags": [
      "readonly"
    ],
    "keyStart": 1,
    "keyStop": -1,
    "step": 1
  },
  "migrate": {
    "arity": -6,
    "flags": [
      "write",
      "movablekeys"
    ],
    "keyStart": 0,
    "keyStop": 0,
    "step": 0
  },
  "module": {
    "arity": -2,
    "flags": [
      "admin",
      "noscript"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "monitor": {
    "arity": 1,
    "flags": [
      "admin",
      "noscript"
    ],
    "keyStart": 0,
    "keyStop": 0,
    "step": 0
  },
  "move": {
    "arity": 3,
    "flags": [
      "write",
      "fast"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "mset": {
    "arity": -3,
    "flags": [
      "write",
      "denyoom"
    ],
    "keyStart": 1,
    "keyStop": -1,
    "step": 2
  },
  "msetnx": {
    "arity": -3,
    "flags": [
      "write",
      "denyoom"
    ],
    "keyStart": 1,
    "keyStop": -1,
    "step": 2
  },
  "multi": {
    "arity": 1,
    "flags": [
      "noscript",
      "fast"
    ],
    "keyStart": 0,
    "keyStop": 0,
    "step": 0
  },
  "object": {
    "arity": 3,
    "flags": [
      "readonly"
    ],
    "keyStart": 2,
    "keyStop": 2,
    "step": 2
  },
  "persist": {
    "arity": 2,
    "flags": [
      "write",
      "fast"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "pexpire": {
    "arity": 3,
    "flags": [
      "write",
      "fast"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "pexpireat": {
    "arity": 3,
    "flags": [
      "write",
      "fast"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "pfadd": {
    "arity": -2,
    "flags": [
      "write",
      "denyoom",
      "fast"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "pfcount": {
    "arity": -2,
    "flags": [
      "readonly"
    ],
    "keyStart": 1,
    "keyStop": -1,
    "step": 1
  },
  "pfdebug": {
    "arity": -3,
    "flags": [
      "write"
    ],
    "keyStart": 0,
    "keyStop": 0,
    "step": 0
  },
  "pfmerge": {
    "arity": -2,
    "flags": [
      "write",
      "denyoom"
    ],
    "keyStart": 1,
    "keyStop": -1,
    "step": 1
  },
  "pfselftest": {
    "arity": 1,
    "flags": [
      "admin"
    ],
    "keyStart": 0,
    "keyStop": 0,
    "step": 0
  },
  "ping": {
    "arity": -1,
    "flags": [
      "stale",
      "fast"
    ],
    "keyStart": 0,
    "keyStop": 0,
    "step": 0
  },
  "post": {
    "arity": -1,
    "flags": [
      "loading",
      "stale"
    ],
    "keyStart": 0,
    "keyStop": 0,
    "step": 0
  },
  "psetex": {
    "arity": 4,
    "flags": [
      "write",
      "denyoom"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "psubscribe": {
    "arity": -2,
    "flags": [
      "pubsub",
      "noscript",
      "loading",
      "stale"
    ],
    "keyStart": 0,
    "keyStop": 0,
    "step": 0
  },
  "psync": {
    "arity": 3,
    "flags": [
      "readonly",
      "admin",
      "noscript"
    ],
    "keyStart": 0,
    "keyStop": 0,
    "step": 0
  },
  "pttl": {
    "arity": 2,
    "flags": [
      "readonly",
      "fast"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "publish": {
    "arity": 3,
    "flags": [
      "pubsub",
      "loading",
      "stale",
      "fast"
    ],
    "keyStart": 0,
    "keyStop": 0,
    "step": 0
  },
  "pubsub": {
    "arity": -2,
    "flags": [
      "pubsub",
      "random",
      "loading",
      "stale"
    ],
    "keyStart": 0,
    "keyStop": 0,
    "step": 0
  },
  "punsubscribe": {
    "arity": -1,
    "flags": [
      "pubsub",
      "noscript",
      "loading",
      "stale"
    ],
    "keyStart": 0,
    "keyStop": 0,
    "step": 0
  },
  "quit": {
    "arity": 1,
    "flags": [
      "loading",
      "stale",
      "readonly"
    ],
    "keyStart": 0,
    "keyStop": 0,
    "step": 0
  },
  "randomkey": {
    "arity": 1,
    "flags": [
      "readonly",
      "random"
    ],
    "keyStart": 0,
    "keyStop": 0,
    "step": 0
  },
  "readonly": {
    "arity": 1,
    "flags": [
      "fast"
    ],
    "keyStart": 0,
    "keyStop": 0,
    "step": 0
  },
  "readwrite": {
    "arity": 1,
    "flags": [
      "fast"
    ],
    "keyStart": 0,
    "keyStop": 0,
    "step": 0
  },
  "rename": {
    "arity": 3,
    "flags": [
      "write"
    ],
    "keyStart": 1,
    "keyStop": 2,
    "step": 1
  },
  "renamenx": {
    "arity": 3,
    "flags": [
      "write",
      "fast"
    ],
    "keyStart": 1,
    "keyStop": 2,
    "step": 1
  },
  "replconf": {
    "arity": -1,
    "flags": [
      "admin",
      "noscript",
      "loading",
      "stale"
    ],
    "keyStart": 0,
    "keyStop": 0,
    "step": 0
  },
  "restore": {
    "arity": -4,
    "flags": [
      "write",
      "denyoom"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "restore-asking": {
    "arity": -4,
    "flags": [
      "write",
      "denyoom",
      "asking"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "role": {
    "arity": 1,
    "flags": [
      "noscript",
      "loading",
      "stale"
    ],
    "keyStart": 0,
    "keyStop": 0,
    "step": 0
  },
  "rpop": {
    "arity": 2,
    "flags": [
      "write",
      "fast"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "rpoplpush": {
    "arity": 3,
    "flags": [
      "write",
      "denyoom"
    ],
    "keyStart": 1,
    "keyStop": 2,
    "step": 1
  },
  "rpush": {
    "arity": -3,
    "flags": [
      "write",
      "denyoom",
      "fast"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "rpushx": {
    "arity": -3,
    "flags": [
      "write",
      "denyoom",
      "fast"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "sadd": {
    "arity": -3,
    "flags": [
      "write",
      "denyoom",
      "fast"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "save": {
    "arity": 1,
    "flags": [
      "admin",
      "noscript"
    ],
    "keyStart": 0,
    "keyStop": 0,
    "step": 0
  },
  "scan": {
    "arity": -2,
    "flags": [
      "readonly",
      "random"
    ],
    "keyStart": 0,
    "keyStop": 0,
    "step": 0
  },
  "scard": {
    "arity": 2,
    "flags": [
      "readonly",
      "fast"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "script": {
    "arity": -2,
    "flags": [
      "noscript"
    ],
    "keyStart": 0,
    "keyStop": 0,
    "step": 0
  },
  "sdiff": {
    "arity": -2,
    "flags": [
      "readonly",
      "sort_for_script"
    ],
    "keyStart": 1,
    "keyStop": -1,
    "step": 1
  },
  "sdiffstore": {
    "arity": -3,
    "flags": [
      "write",
      "denyoom"
    ],
    "keyStart": 1,
    "keyStop": -1,
    "step": 1
  },
  "select": {
    "arity": 2,
    "flags": [
      "loading",
      "fast"
    ],
    "keyStart": 0,
    "keyStop": 0,
    "step": 0
  },
  "set": {
    "arity": -3,
    "flags": [
      "write",
      "denyoom"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "setbit": {
    "arity": 4,
    "flags": [
      "write",
      "denyoom"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "setex": {
    "arity": 4,
    "flags": [
      "write",
      "denyoom"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "setnx": {
    "arity": 3,
    "flags": [
      "write",
      "denyoom",
      "fast"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "setrange": {
    "arity": 4,
    "flags": [
      "write",
      "denyoom"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "shutdown": {
    "arity": -1,
    "flags": [
      "admin",
      "loading",
      "stale"
    ],
    "keyStart": 0,
    "keyStop": 0,
    "step": 0
  },
  "sinter": {
    "arity": -2,
    "flags": [
      "readonly",
      "sort_for_script"
    ],
    "keyStart": 1,
    "keyStop": -1,
    "step": 1
  },
  "sinterstore": {
    "arity": -3,
    "flags": [
      "write",
      "denyoom"
    ],
    "keyStart": 1,
    "keyStop": -1,
    "step": 1
  },
  "sismember": {
    "arity": 3,
    "flags": [
      "readonly",
      "fast"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "slaveof": {
    "arity": 3,
    "flags": [
      "admin",
      "noscript",
      "stale"
    ],
    "keyStart": 0,
    "keyStop": 0,
    "step": 0
  },
  "slowlog": {
    "arity": -2,
    "flags": [
      "admin"
    ],
    "keyStart": 0,
    "keyStop": 0,
    "step": 0
  },
  "smembers": {
    "arity": 2,
    "flags": [
      "readonly",
      "sort_for_script"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "smove": {
    "arity": 4,
    "flags": [
      "write",
      "fast"
    ],
    "keyStart": 1,
    "keyStop": 2,
    "step": 1
  },
  "sort": {
    "arity": -2,
    "flags": [
      "write",
      "denyoom",
      "movablekeys"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "spop": {
    "arity": -2,
    "flags": [
      "write",
      "random",
      "fast"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "srandmember": {
    "arity": -2,
    "flags": [
      "readonly",
      "random"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "srem": {
    "arity": -3,
    "flags": [
      "write",
      "fast"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "sscan": {
    "arity": -3,
    "flags": [
      "readonly",
      "random"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "strlen": {
    "arity": 2,
    "flags": [
      "readonly",
      "fast"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "subscribe": {
    "arity": -2,
    "flags": [
      "pubsub",
      "noscript",
      "loading",
      "stale"
    ],
    "keyStart": 0,
    "keyStop": 0,
    "step": 0
  },
  "substr": {
    "arity": 4,
    "flags": [
      "readonly"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "sunion": {
    "arity": -2,
    "flags": [
      "readonly",
      "sort_for_script"
    ],
    "keyStart": 1,
    "keyStop": -1,
    "step": 1
  },
  "sunionstore": {
    "arity": -3,
    "flags": [
      "write",
      "denyoom"
    ],
    "keyStart": 1,
    "keyStop": -1,
    "step": 1
  },
  "swapdb": {
    "arity": 3,
    "flags": [
      "write",
      "fast"
    ],
    "keyStart": 0,
    "keyStop": 0,
    "step": 0
  },
  "sync": {
    "arity": 1,
    "flags": [
      "readonly",
      "admin",
      "noscript"
    ],
    "keyStart": 0,
    "keyStop": 0,
    "step": 0
  },
  "time": {
    "arity": 1,
    "flags": [
      "random",
      "fast"
    ],
    "keyStart": 0,
    "keyStop": 0,
    "step": 0
  },
  "touch": {
    "arity": -2,
    "flags": [
      "readonly",
      "fast"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "ttl": {
    "arity": 2,
    "flags": [
      "readonly",
      "fast"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "type": {
    "arity": 2,
    "flags": [
      "readonly",
      "fast"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "unlink": {
    "arity": -2,
    "flags": [
      "write",
      "fast"
    ],
    "keyStart": 1,
    "keyStop": -1,
    "step": 1
  },
  "unsubscribe": {
    "arity": -1,
    "flags": [
      "pubsub",
      "noscript",
      "loading",
      "stale"
    ],
    "keyStart": 0,
    "keyStop": 0,
    "step": 0
  },
  "unwatch": {
    "arity": 1,
    "flags": [
      "noscript",
      "fast"
    ],
    "keyStart": 0,
    "keyStop": 0,
    "step": 0
  },
  "wait": {
    "arity": 3,
    "flags": [
      "noscript"
    ],
    "keyStart": 0,
    "keyStop": 0,
    "step": 0
  },
  "watch": {
    "arity": -2,
    "flags": [
      "noscript",
      "fast"
    ],
    "keyStart": 1,
    "keyStop": -1,
    "step": 1
  },
  "zadd": {
    "arity": -4,
    "flags": [
      "write",
      "denyoom",
      "fast"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "zcard": {
    "arity": 2,
    "flags": [
      "readonly",
      "fast"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "zcount": {
    "arity": 4,
    "flags": [
      "readonly",
      "fast"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "zincrby": {
    "arity": 4,
    "flags": [
      "write",
      "denyoom",
      "fast"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "zinterstore": {
    "arity": -4,
    "flags": [
      "write",
      "denyoom",
      "movablekeys"
    ],
    "keyStart": 0,
    "keyStop": 0,
    "step": 0
  },
  "zlexcount": {
    "arity": 4,
    "flags": [
      "readonly",
      "fast"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "zrange": {
    "arity": -4,
    "flags": [
      "readonly"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "zrangebylex": {
    "arity": -4,
    "flags": [
      "readonly"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "zrangebyscore": {
    "arity": -4,
    "flags": [
      "readonly"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "zrank": {
    "arity": 3,
    "flags": [
      "readonly",
      "fast"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "zrem": {
    "arity": -3,
    "flags": [
      "write",
      "fast"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "zremrangebylex": {
    "arity": 4,
    "flags": [
      "write"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "zremrangebyrank": {
    "arity": 4,
    "flags": [
      "write"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "zremrangebyscore": {
    "arity": 4,
    "flags": [
      "write"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "zrevrange": {
    "arity": -4,
    "flags": [
      "readonly"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "zrevrangebylex": {
    "arity": -4,
    "flags": [
      "readonly"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "zrevrangebyscore": {
    "arity": -4,
    "flags": [
      "readonly"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "zrevrank": {
    "arity": 3,
    "flags": [
      "readonly",
      "fast"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "zscan": {
    "arity": -3,
    "flags": [
      "readonly",
      "random"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "zscore": {
    "arity": 3,
    "flags": [
      "readonly",
      "fast"
    ],
    "keyStart": 1,
    "keyStop": 1,
    "step": 1
  },
  "zunionstore": {
    "arity": -4,
    "flags": [
      "write",
      "denyoom",
      "movablekeys"
    ],
    "keyStart": 0,
    "keyStop": 0,
    "step": 0
  }
}

/**
 * Redis command list
 *
 * All commands are lowercased.
 *
 * @var {string[]}
 * @public
 */
exports.list = Object.keys(commands)

var flags = {}
exports.list.forEach(function (commandName) {
  flags[commandName] = commands[commandName].flags.reduce(function (flags, flag) {
    flags[flag] = true
    return flags
  }, {})
})
/**
 * Check if the command exists
 *
 * @param {string} commandName - the command name
 * @return {boolean} result
 * @public
 */
exports.exists = function (commandName) {
  return Boolean(commands[commandName])
}

/**
 * Check if the command has the flag
 *
 * Some of possible flags: readonly, noscript, loading
 * @param {string} commandName - the command name
 * @param {string} flag - the flag to check
 * @return {boolean} result
 * @public
 */
exports.hasFlag = function (commandName, flag) {
  if (!flags[commandName]) {
    throw new Error('Unknown command ' + commandName)
  }

  return Boolean(flags[commandName][flag])
}

/**
 * Get indexes of keys in the command arguments
 *
 * @param {string} commandName - the command name
 * @param {string[]} args - the arguments of the command
 * @param {object} [options] - options
 * @param {boolean} [options.parseExternalKey] - parse external keys
 * @return {number[]} - the list of the index
 * @public
 *
 * @example
 * ```javascript
 * getKeyIndexes('set', ['key', 'value']) // [0]
 * getKeyIndexes('mget', ['key1', 'key2']) // [0, 1]
 * ```
 */
exports.getKeyIndexes = function (commandName, args, options) {
  var command = commands[commandName]
  if (!command) {
    throw new Error('Unknown command ' + commandName)
  }

  if (!Array.isArray(args)) {
    throw new Error('Expect args to be an array')
  }

  var keys = []
  var i, keyStart, keyStop, parseExternalKey
  switch (commandName) {
    case 'zunionstore':
    case 'zinterstore':
      keys.push(0)
    // fall through
    case 'eval':
    case 'evalsha':
      keyStop = Number(args[1]) + 2
      for (i = 2; i < keyStop; i++) {
        keys.push(i)
      }
      break
    case 'sort':
      parseExternalKey = options && options.parseExternalKey
      keys.push(0)
      for (i = 1; i < args.length - 1; i++) {
        if (typeof args[i] !== 'string') {
          continue
        }
        var directive = args[i].toUpperCase()
        if (directive === 'GET') {
          i += 1
          if (args[i] !== '#') {
            if (parseExternalKey) {
              keys.push([i, getExternalKeyNameLength(args[i])])
            } else {
              keys.push(i)
            }
          }
        } else if (directive === 'BY') {
          i += 1
          if (parseExternalKey) {
            keys.push([i, getExternalKeyNameLength(args[i])])
          } else {
            keys.push(i)
          }
        } else if (directive === 'STORE') {
          i += 1
          keys.push(i)
        }
      }
      break
    case 'migrate':
      if (args[2] === '') {
        for (i = 5; i < args.length - 1; i++) {
          if (args[i].toUpperCase() === 'KEYS') {
            for (var j = i + 1; j < args.length; j++) {
              keys.push(j)
            }
            break
          }
        }
      } else {
        keys.push(2)
      }
      break
    default:
    // step has to be at least one in this case, otherwise the command does not contain a key
      if (command.step > 0) {
        keyStart = command.keyStart - 1
        keyStop = command.keyStop > 0 ? command.keyStop : args.length + command.keyStop + 1
        for (i = keyStart; i < keyStop; i += command.step) {
          keys.push(i)
        }
      }
      break
  }

  return keys
}

function getExternalKeyNameLength (key) {
  if (typeof key !== 'string') {
    key = String(key)
  }
  var hashPos = key.indexOf('->')
  return hashPos === -1 ? key.length : hashPos
}
