'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.code=void 0;exports.code=`parameter unit;
storage (pair (big_map %metadata string
                                 bytes)
              (unit %dummy));
code { CAR;
       UNIT;
       PUSH string "EmptySupplied";
       PAIR;
       FAILWITH };`;