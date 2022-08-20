import { Effect, runEffect } from '@lsby/ts_pattern'
import * as Demo1 from './Model/Demo/Demo1'
import * as Demo2 from './Model/Demo/Demo2'
import * as Demo3 from './Model/Demo/Demo3'

function main(): Effect<null> {
  // return Demo1.main()
  // return Demo2.main()
  return Demo3.main()
}
runEffect(main())
