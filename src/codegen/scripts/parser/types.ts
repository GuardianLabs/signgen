import { compact } from 'lodash'
import { AbiOutputParameter, AbiParameter, EvmOutputType, EvmType, TupleType } from './parseEvmTypes'

export const FACTORY_POSTFIX = '__factory'
export const STRUCT_INPUT_POSTFIX = 'Struct'
export const STRUCT_OUTPUT_POSTFIX = 'StructOutput'

interface GenerateTypeOptions {
  returnResultObject?: boolean
  useStructs?: boolean // uses struct type for first depth, if false then generates first depth tuple types
}

export function generateInputTypes(input: Array<AbiParameter>, options: GenerateTypeOptions): string {
  if (input.length === 0) {
    return ''
  }
  return (
    input
      .map((input, index) => `${input.name || `arg${index}`}: ${generateInputType(options, input.type)}`)
      .join(', ') + ', '
  )
}

export function generateOutputTypes(options: GenerateTypeOptions, outputs: Array<AbiOutputParameter>): string {
  if (!options.returnResultObject && outputs.length === 1) {
    return generateOutputType(options, outputs[0].type)
  } else {
    return generateOutputComplexType(outputs, options)
  }
}

// https://docs.ethers.io/ethers.js/html/api-contract.html#types
export function generateInputType(options: GenerateTypeOptions, evmType: EvmType): string {
  switch (evmType.type) {
    case 'integer':
      return 'BigNumberish'
    case 'uinteger':
      return 'BigNumberish'
    case 'address':
      return 'string'
    case 'bytes':
    case 'dynamic-bytes':
      return 'BytesLike'
    case 'array':
      return generateArrayOrTupleType(generateInputType(options, evmType.itemType), evmType.size)
    case 'boolean':
      return 'boolean'
    case 'string':
      return 'string'
    case 'tuple':
      if (evmType.structName && options.useStructs) {
        return evmType.structName.toString() + STRUCT_INPUT_POSTFIX
      }
      return generateObjectTypeLiteral(evmType, generateInputType.bind(null, { ...options, useStructs: true }))
    case 'unknown':
      return 'any'
  }
}

export function generateOutputType(options: GenerateTypeOptions, evmType: EvmOutputType): string {
  switch (evmType.type) {
    case 'integer':
    case 'uinteger':
      return evmType.bits <= 48 ? 'number' : 'BigNumber'
    case 'address':
      return 'string'
    case 'void':
      return 'void'
    case 'bytes':
    case 'dynamic-bytes':
      return 'string'
    case 'array':
      return generateArrayOrTupleType(generateOutputType(options, evmType.itemType), evmType.size)
    case 'boolean':
      return 'boolean'
    case 'string':
      return 'string'
    case 'tuple':
      if (evmType.structName && options.useStructs) {
        return evmType.structName.toString() + STRUCT_OUTPUT_POSTFIX
      }
      return generateOutputComplexType(evmType.components, { ...options, useStructs: true })
    case 'unknown':
      return 'any'
  }
}

export function generateObjectTypeLiteral(tuple: TupleType, generator: (evmType: EvmType) => string) {
  return '{' + tuple.components.map((component) => `${component.name}: ${generator(component.type)}`).join(', ') + '}'
}

/**
 * Always return an array type; if there are named outputs, merge them to that type
 * this generates slightly better typings fixing: https://github.com/ethereum-ts/TypeChain/issues/232
 **/
export function generateOutputComplexType(components: AbiOutputParameter[], options: GenerateTypeOptions) {
  const existingOutputComponents = compact([
    generateOutputComplexTypeAsArray(components, options),
    generateOutputComplexTypesAsObject(components, options),
  ])
  return existingOutputComponents.join(' & ')
}

export function generateOutputComplexTypeAsArray(
  components: AbiOutputParameter[],
  options: GenerateTypeOptions,
): string {
  return `[${components.map((t) => generateOutputType(options, t.type)).join(', ')}]`
}

export function generateOutputComplexTypesAsObject(
  components: AbiOutputParameter[],
  options: GenerateTypeOptions,
): string | undefined {
  let namedElementsCode
  const namedElements = components.filter((e) => !!e.name)
  if (namedElements.length > 0) {
    namedElementsCode =
      '{' + namedElements.map((t) => `${t.name}: ${generateOutputType(options, t.type)}`).join(', ') + ' }'
  }

  return namedElementsCode
}

function generateArrayOrTupleType(item: string, length?: number) {
  if (length !== undefined && length < 6) {
    return `[${Array(length).fill(item).join(', ')}]`
  } else {
    return `${item}[]`
  }
}