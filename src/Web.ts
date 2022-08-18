import { Effect, runEffect } from '@lsby/ts_struct/src/Type/Effect'
import * as Demo1 from './Demo/Demo1'
import * as Demo2 from './Demo/Demo2'
import * as Demo3 from './Demo/Demo3'

function main(): Effect<null> {
  // return Demo1.main()
  // return Demo2.main()
  return Demo3.main()
}
runEffect(main())
