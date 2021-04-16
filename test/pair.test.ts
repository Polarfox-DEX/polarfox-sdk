import { ChainId, Token, Pair, TokenAmount, WAVAX, Price } from '../src'

describe('Pair', () => {
  const TEST1 = new Token(ChainId.FUJI, '0x8106a9048c6B8AFeE3Bad165547b439307Adf734', 18, 'TEST1', 'Test 1')
  const TEST2 = new Token(ChainId.FUJI, '0xca07bBc5a033557Bca31e4f550ADBEb65c2BbB45', 18, 'TEST2', 'Test 2')

  describe('constructor', () => {
    it('cannot be used for tokens on different chains', () => {
      expect(
        () =>
          new Pair(new TokenAmount(TEST1, '100'), new TokenAmount(WAVAX[ChainId.AVALANCHE], '100'), ChainId.AVALANCHE)
      ).toThrow('CHAIN_IDS')
    })
  })

  // describe('#getAddress', () => {
  //   it('returns the correct address', () => {
  //     expect(Pair.getAddress(TEST1, TEST2, ChainId.FUJI)).toEqual('0xaf5fdF7De60779DA4409498DfdfA3803984e8536') // TODO: Add Fuji address of the TEST1 / TEST2 pair here
  //   })
  // })

  describe('#token0', () => {
    it('always is the token that sorts before', () => {
      expect(new Pair(new TokenAmount(TEST1, '100'), new TokenAmount(TEST2, '100'), ChainId.FUJI).token0).toEqual(TEST1)
      expect(new Pair(new TokenAmount(TEST2, '100'), new TokenAmount(TEST1, '100'), ChainId.FUJI).token0).toEqual(TEST1)
    })
  })
  describe('#token1', () => {
    it('always is the token that sorts after', () => {
      expect(new Pair(new TokenAmount(TEST1, '100'), new TokenAmount(TEST2, '100'), ChainId.FUJI).token1).toEqual(TEST2)
      expect(new Pair(new TokenAmount(TEST2, '100'), new TokenAmount(TEST1, '100'), ChainId.FUJI).token1).toEqual(TEST2)
    })
  })
  describe('#reserve0', () => {
    it('always comes from the token that sorts before', () => {
      expect(new Pair(new TokenAmount(TEST1, '100'), new TokenAmount(TEST2, '101'), ChainId.FUJI).reserve0).toEqual(
        new TokenAmount(TEST1, '100')
      )
      expect(new Pair(new TokenAmount(TEST2, '101'), new TokenAmount(TEST1, '100'), ChainId.FUJI).reserve0).toEqual(
        new TokenAmount(TEST1, '100')
      )
    })
  })
  describe('#reserve1', () => {
    it('always comes from the token that sorts after', () => {
      expect(new Pair(new TokenAmount(TEST1, '100'), new TokenAmount(TEST2, '101'), ChainId.FUJI).reserve1).toEqual(
        new TokenAmount(TEST2, '101')
      )
      expect(new Pair(new TokenAmount(TEST2, '101'), new TokenAmount(TEST1, '100'), ChainId.FUJI).reserve1).toEqual(
        new TokenAmount(TEST2, '101')
      )
    })
  })

  describe('#token0Price', () => {
    it('returns price of token0 in terms of token1', () => {
      expect(new Pair(new TokenAmount(TEST1, '101'), new TokenAmount(TEST2, '100'), ChainId.FUJI).token0Price).toEqual(
        new Price(TEST1, TEST2, '101', '100')
      )
      expect(new Pair(new TokenAmount(TEST2, '100'), new TokenAmount(TEST1, '101'), ChainId.FUJI).token0Price).toEqual(
        new Price(TEST1, TEST2, '101', '100')
      )
    })
  })

  describe('#token1Price', () => {
    it('returns price of token1 in terms of token0', () => {
      expect(new Pair(new TokenAmount(TEST1, '101'), new TokenAmount(TEST2, '100'), ChainId.FUJI).token1Price).toEqual(
        new Price(TEST2, TEST1, '100', '101')
      )
      expect(new Pair(new TokenAmount(TEST2, '100'), new TokenAmount(TEST1, '101'), ChainId.FUJI).token1Price).toEqual(
        new Price(TEST2, TEST1, '100', '101')
      )
    })
  })

  describe('#priceOf', () => {
    const pair = new Pair(new TokenAmount(TEST1, '101'), new TokenAmount(TEST2, '100'), ChainId.FUJI)
    it('returns price of token in terms of other token', () => {
      expect(pair.priceOf(TEST1)).toEqual(pair.token0Price)
      expect(pair.priceOf(TEST2)).toEqual(pair.token1Price)
    })

    it('throws if invalid token', () => {
      expect(() => pair.priceOf(WAVAX[ChainId.FUJI])).toThrow('TOKEN')
    })
  })

  describe('#reserveOf', () => {
    it('returns reserves of the given token', () => {
      expect(
        new Pair(new TokenAmount(TEST1, '100'), new TokenAmount(TEST2, '101'), ChainId.FUJI).reserveOf(TEST1)
      ).toEqual(new TokenAmount(TEST1, '100'))
      expect(
        new Pair(new TokenAmount(TEST2, '101'), new TokenAmount(TEST1, '100'), ChainId.FUJI).reserveOf(TEST1)
      ).toEqual(new TokenAmount(TEST1, '100'))
    })

    it('throws if not in the pair', () => {
      expect(() =>
        new Pair(new TokenAmount(TEST2, '101'), new TokenAmount(TEST1, '100'), ChainId.FUJI).reserveOf(
          WAVAX[ChainId.FUJI]
        )
      ).toThrow('TOKEN')
    })
  })

  describe('#chainId', () => {
    it('returns the token0 chainId', () => {
      expect(new Pair(new TokenAmount(TEST1, '100'), new TokenAmount(TEST2, '100'), ChainId.FUJI).chainId).toEqual(
        ChainId.FUJI
      )
      expect(new Pair(new TokenAmount(TEST2, '100'), new TokenAmount(TEST1, '100'), ChainId.FUJI).chainId).toEqual(
        ChainId.FUJI
      )
    })
  })
  describe('#involvesToken', () => {
    expect(
      new Pair(new TokenAmount(TEST1, '100'), new TokenAmount(TEST2, '100'), ChainId.FUJI).involvesToken(TEST1)
    ).toEqual(true)
    expect(
      new Pair(new TokenAmount(TEST1, '100'), new TokenAmount(TEST2, '100'), ChainId.FUJI).involvesToken(TEST2)
    ).toEqual(true)
    expect(
      new Pair(new TokenAmount(TEST1, '100'), new TokenAmount(TEST2, '100'), ChainId.FUJI).involvesToken(
        WAVAX[ChainId.FUJI]
      )
    ).toEqual(false)
  })
})
