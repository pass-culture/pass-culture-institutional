import { describe, expect, it } from 'vitest'

import { stripTags } from '@/utils/stripTags'

describe('stripTags', () => {
  it('should remove HTML tags', () => {
    expect(stripTags('hello<br/>world')).toEqual('helloworld')
  })

  it('should remove HTML tags and keep spaces', () => {
    expect(stripTags('hello <br/>world')).toEqual('hello world')
    expect(stripTags('hello<br/> world')).toEqual('hello world')
  })

  it('should remove HTML tags and merge double spaces in one', () => {
    expect(stripTags('hello <br/> world')).toEqual('hello world')
    expect(stripTags('hello   <br/>   world')).toEqual('hello world')
  })
})
