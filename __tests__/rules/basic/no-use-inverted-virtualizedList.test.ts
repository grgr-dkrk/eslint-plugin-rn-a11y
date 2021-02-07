import { RuleTester } from 'eslint'
import { noUseInvertedVirtualizedList } from '../../../src/rules'
import { createTesterOptions } from '../../createTesterOptions'

const ruleTester = new RuleTester(createTesterOptions())

const ERROR_MESSAGE =
  '`inverted` only changes the order of the visual elements. This may prevent screen readers from reading correctly.'

ruleTester.run(
  'no-use-inverted-virtualizedList',
  noUseInvertedVirtualizedList,
  {
    valid: [
      {
        code: `<FlatList data={[{ id: '1', val: 'foo' }, { id: '2', val: 'bar' }, { id: '3', val: 'baz' }]} renderItem={(item) => (<View><Text>{item.val}</Text></View>)} keyExtractor={(item) => item.id} />`,
      },
      {
        code: `<SectionList sections={[{ title: section1, data: [{ id: '1', val: 'foo' }]}, { title: section2, data: [{ id: '1', val: 'bar' }]}, { title: section3, data: [{ id: '1', val: 'baz' }]}]} renderItem={(item) => (<View><Text>{item.val}</Text></View>)} keyExtractor={(item) => item.title} />`,
      },
    ],
    invalid: [
      {
        code: `<FlatList data={[{ id: '1', val: 'foo' }, { id: '2', val: 'bar' }, { id: '3', val: 'baz' }]} renderItem={(item) => (<View><Text>{item.val}</Text></View>)} keyExtractor={(item) => item.id} inverted/>`,
        errors: [ERROR_MESSAGE],
      },
      {
        code: `<SectionList sections={[{ title: section1, data: [{ id: '1', val: 'foo' }]}, { title: section2, data: [{ id: '1', val: 'bar' }]}, { title: section3, data: [{ id: '1', val: 'baz' }]}]} renderItem={(item) => (<View><Text>{item.val}</Text></View>)} keyExtractor={(item) => item.title} inverted />`,
        errors: [ERROR_MESSAGE],
      },
    ],
  },
)
