import { Effect, runEffect } from '@lsby/ts_struct/src/Type/Effect'
import * as Demo2 from './Demo/Demo2'

function main(): Effect<null> {
  return Demo2.main()
}
runEffect(main())
