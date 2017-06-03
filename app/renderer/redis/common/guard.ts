export module Guard {
    export function ArgumentIsNotNil(arg: object) {
        if(_.isNil(arg)){
          throw new ArgumentIsNilException();
        }
    }
}

class ArgumentIsNilException{

}