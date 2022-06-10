/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "k8s.io.apimachinery.pkg.runtime";

/**
 * RawExtension is used to hold extensions in external versions.
 *
 * To use this, make a field which has RawExtension as its type in your external, versioned
 * struct, and Object in your internal struct. You also need to register your
 * various plugin types.
 *
 * // Internal package:
 * type MyAPIObject struct {
 * 	runtime.TypeMeta `json:",inline"`
 * 	MyPlugin runtime.Object `json:"myPlugin"`
 * }
 * type PluginA struct {
 * 	AOption string `json:"aOption"`
 * }
 *
 * // External package:
 * type MyAPIObject struct {
 * 	runtime.TypeMeta `json:",inline"`
 * 	MyPlugin runtime.RawExtension `json:"myPlugin"`
 * }
 * type PluginA struct {
 * 	AOption string `json:"aOption"`
 * }
 *
 * // On the wire, the JSON will look something like this:
 * {
 * 	"kind":"MyAPIObject",
 * 	"apiVersion":"v1",
 * 	"myPlugin": {
 * 		"kind":"PluginA",
 * 		"aOption":"foo",
 * 	},
 * }
 *
 * So what happens? Decode first uses json or yaml to unmarshal the serialized data into
 * your external MyAPIObject. That causes the raw JSON to be stored, but not unpacked.
 * The next step is to copy (using pkg/conversion) into the internal struct. The runtime
 * package's DefaultScheme has conversion functions installed which will unpack the
 * JSON stored in RawExtension, turning it into the correct object type, and storing it
 * in the Object. (TODO: In the case where the object is of an unknown type, a
 * runtime.Unknown object will be created and stored.)
 *
 * +k8s:deepcopy-gen=true
 * +protobuf=true
 * +k8s:openapi-gen=true
 */
export interface RawExtension {
  /**
   * Raw is the underlying serialization of this object.
   *
   * TODO: Determine how to detect ContentType and ContentEncoding of 'Raw' data.
   */
  raw: Uint8Array;
}

/**
 * TypeMeta is shared by all top level objects. The proper way to use it is to inline it in your type,
 * like this:
 * type MyAwesomeAPIObject struct {
 *      runtime.TypeMeta    `json:",inline"`
 *      ... // other fields
 * }
 * func (obj *MyAwesomeAPIObject) SetGroupVersionKind(gvk *metav1.GroupVersionKind) { metav1.UpdateTypeMeta(obj,gvk) }; GroupVersionKind() *GroupVersionKind
 *
 * TypeMeta is provided here for convenience. You may use it directly from this package or define
 * your own with the same fields.
 *
 * +k8s:deepcopy-gen=false
 * +protobuf=true
 * +k8s:openapi-gen=true
 */
export interface TypeMeta {
  /** +optional */
  apiVersion: string;
  /** +optional */
  kind: string;
}

/**
 * Unknown allows api objects with unknown types to be passed-through. This can be used
 * to deal with the API objects from a plug-in. Unknown objects still have functioning
 * TypeMeta features-- kind, version, etc.
 * TODO: Make this object have easy access to field based accessors and settors for
 * metadata and field mutatation.
 *
 * +k8s:deepcopy-gen=true
 * +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object
 * +protobuf=true
 * +k8s:openapi-gen=true
 */
export interface Unknown {
  typeMeta?: TypeMeta;
  /**
   * Raw will hold the complete serialized object which couldn't be matched
   * with a registered type. Most likely, nothing should be done with this
   * except for passing it through the system.
   */
  raw: Uint8Array;
  /**
   * ContentEncoding is encoding used to encode 'Raw' data.
   * Unspecified means no encoding.
   */
  contentEncoding: string;
  /**
   * ContentType  is serialization method used to serialize 'Raw'.
   * Unspecified means ContentTypeJSON.
   */
  contentType: string;
}

function createBaseRawExtension(): RawExtension {
  return { raw: new Uint8Array() };
}

export const RawExtension = {
  encode(
    message: RawExtension,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.raw.length !== 0) {
      writer.uint32(10).bytes(message.raw);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RawExtension {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRawExtension();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.raw = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RawExtension {
    return {
      raw: isSet(object.raw) ? bytesFromBase64(object.raw) : new Uint8Array(),
    };
  },

  toJSON(message: RawExtension): unknown {
    const obj: any = {};
    message.raw !== undefined &&
      (obj.raw = base64FromBytes(
        message.raw !== undefined ? message.raw : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RawExtension>, I>>(
    object: I
  ): RawExtension {
    const message = createBaseRawExtension();
    message.raw = object.raw ?? new Uint8Array();
    return message;
  },
};

function createBaseTypeMeta(): TypeMeta {
  return { apiVersion: "", kind: "" };
}

export const TypeMeta = {
  encode(
    message: TypeMeta,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.apiVersion !== "") {
      writer.uint32(10).string(message.apiVersion);
    }
    if (message.kind !== "") {
      writer.uint32(18).string(message.kind);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TypeMeta {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTypeMeta();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.apiVersion = reader.string();
          break;
        case 2:
          message.kind = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TypeMeta {
    return {
      apiVersion: isSet(object.apiVersion) ? String(object.apiVersion) : "",
      kind: isSet(object.kind) ? String(object.kind) : "",
    };
  },

  toJSON(message: TypeMeta): unknown {
    const obj: any = {};
    message.apiVersion !== undefined && (obj.apiVersion = message.apiVersion);
    message.kind !== undefined && (obj.kind = message.kind);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TypeMeta>, I>>(object: I): TypeMeta {
    const message = createBaseTypeMeta();
    message.apiVersion = object.apiVersion ?? "";
    message.kind = object.kind ?? "";
    return message;
  },
};

function createBaseUnknown(): Unknown {
  return {
    typeMeta: undefined,
    raw: new Uint8Array(),
    contentEncoding: "",
    contentType: "",
  };
}

export const Unknown = {
  encode(
    message: Unknown,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.typeMeta !== undefined) {
      TypeMeta.encode(message.typeMeta, writer.uint32(10).fork()).ldelim();
    }
    if (message.raw.length !== 0) {
      writer.uint32(18).bytes(message.raw);
    }
    if (message.contentEncoding !== "") {
      writer.uint32(26).string(message.contentEncoding);
    }
    if (message.contentType !== "") {
      writer.uint32(34).string(message.contentType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Unknown {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUnknown();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.typeMeta = TypeMeta.decode(reader, reader.uint32());
          break;
        case 2:
          message.raw = reader.bytes();
          break;
        case 3:
          message.contentEncoding = reader.string();
          break;
        case 4:
          message.contentType = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Unknown {
    return {
      typeMeta: isSet(object.typeMeta)
        ? TypeMeta.fromJSON(object.typeMeta)
        : undefined,
      raw: isSet(object.raw) ? bytesFromBase64(object.raw) : new Uint8Array(),
      contentEncoding: isSet(object.contentEncoding)
        ? String(object.contentEncoding)
        : "",
      contentType: isSet(object.contentType) ? String(object.contentType) : "",
    };
  },

  toJSON(message: Unknown): unknown {
    const obj: any = {};
    message.typeMeta !== undefined &&
      (obj.typeMeta = message.typeMeta
        ? TypeMeta.toJSON(message.typeMeta)
        : undefined);
    message.raw !== undefined &&
      (obj.raw = base64FromBytes(
        message.raw !== undefined ? message.raw : new Uint8Array()
      ));
    message.contentEncoding !== undefined &&
      (obj.contentEncoding = message.contentEncoding);
    message.contentType !== undefined &&
      (obj.contentType = message.contentType);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Unknown>, I>>(object: I): Unknown {
    const message = createBaseUnknown();
    message.typeMeta =
      object.typeMeta !== undefined && object.typeMeta !== null
        ? TypeMeta.fromPartial(object.typeMeta)
        : undefined;
    message.raw = object.raw ?? new Uint8Array();
    message.contentEncoding = object.contentEncoding ?? "";
    message.contentType = object.contentType ?? "";
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

const atob: (b64: string) => string =
  globalThis.atob ||
  ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

const btoa: (bin: string) => string =
  globalThis.btoa ||
  ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  arr.forEach((byte) => {
    bin.push(String.fromCharCode(byte));
  });
  return btoa(bin.join(""));
}

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
