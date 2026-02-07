import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace tools. */
export namespace tools {

    /** Namespace simrail. */
    namespace simrail {

        /** Namespace backend. */
        namespace backend {

            /** Properties of a GeoPosition. */
            interface IGeoPosition {

                /** GeoPosition latitude */
                latitude?: (number|undefined);

                /** GeoPosition longitude */
                longitude?: (number|undefined);
            }

            /** Represents a GeoPosition. */
            class GeoPosition implements IGeoPosition {

                /**
                 * Constructs a new GeoPosition.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: tools.simrail.backend.IGeoPosition);

                /** GeoPosition latitude. */
                public latitude: number;

                /** GeoPosition longitude. */
                public longitude: number;

                /**
                 * Encodes the specified GeoPosition message. Does not implicitly {@link tools.simrail.backend.GeoPosition.verify|verify} messages.
                 * @param message GeoPosition message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: tools.simrail.backend.IGeoPosition, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GeoPosition message, length delimited. Does not implicitly {@link tools.simrail.backend.GeoPosition.verify|verify} messages.
                 * @param message GeoPosition message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: tools.simrail.backend.IGeoPosition, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GeoPosition message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GeoPosition
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tools.simrail.backend.GeoPosition;

                /**
                 * Decodes a GeoPosition message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GeoPosition
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tools.simrail.backend.GeoPosition;

                /**
                 * Verifies a GeoPosition message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GeoPosition message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GeoPosition
                 */
                public static fromObject(object: { [k: string]: any }): tools.simrail.backend.GeoPosition;

                /**
                 * Creates a plain object from a GeoPosition message. Also converts values to other types if specified.
                 * @param message GeoPosition
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: tools.simrail.backend.GeoPosition, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GeoPosition to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for GeoPosition
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a SignalInfo. */
            interface ISignalInfo {

                /** SignalInfo name */
                name?: (string|undefined);

                /** SignalInfo distanceMeters */
                distanceMeters?: (number|undefined);

                /** SignalInfo maxSpeedKmh */
                maxSpeedKmh?: (number|null|undefined);
            }

            /** Represents a SignalInfo. */
            class SignalInfo implements ISignalInfo {

                /**
                 * Constructs a new SignalInfo.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: tools.simrail.backend.ISignalInfo);

                /** SignalInfo name. */
                public name: string;

                /** SignalInfo distanceMeters. */
                public distanceMeters: number;

                /** SignalInfo maxSpeedKmh. */
                public maxSpeedKmh: (number|null);

                /**
                 * Encodes the specified SignalInfo message. Does not implicitly {@link tools.simrail.backend.SignalInfo.verify|verify} messages.
                 * @param message SignalInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: tools.simrail.backend.ISignalInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified SignalInfo message, length delimited. Does not implicitly {@link tools.simrail.backend.SignalInfo.verify|verify} messages.
                 * @param message SignalInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: tools.simrail.backend.ISignalInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a SignalInfo message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns SignalInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tools.simrail.backend.SignalInfo;

                /**
                 * Decodes a SignalInfo message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns SignalInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tools.simrail.backend.SignalInfo;

                /**
                 * Verifies a SignalInfo message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a SignalInfo message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns SignalInfo
                 */
                public static fromObject(object: { [k: string]: any }): tools.simrail.backend.SignalInfo;

                /**
                 * Creates a plain object from a SignalInfo message. Also converts values to other types if specified.
                 * @param message SignalInfo
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: tools.simrail.backend.SignalInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this SignalInfo to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for SignalInfo
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** UserPlatform enum. */
            enum UserPlatform {
                STEAM = 0,
                XBOX = 1
            }

            /** Properties of a User. */
            interface IUser {

                /** User id */
                id?: (string|undefined);

                /** User platform */
                platform?: (tools.simrail.backend.UserPlatform|undefined);
            }

            /** Represents a User. */
            class User implements IUser {

                /**
                 * Constructs a new User.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: tools.simrail.backend.IUser);

                /** User id. */
                public id: string;

                /** User platform. */
                public platform: tools.simrail.backend.UserPlatform;

                /**
                 * Encodes the specified User message. Does not implicitly {@link tools.simrail.backend.User.verify|verify} messages.
                 * @param message User message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: tools.simrail.backend.IUser, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified User message, length delimited. Does not implicitly {@link tools.simrail.backend.User.verify|verify} messages.
                 * @param message User message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: tools.simrail.backend.IUser, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a User message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns User
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tools.simrail.backend.User;

                /**
                 * Decodes a User message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns User
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tools.simrail.backend.User;

                /**
                 * Verifies a User message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a User message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns User
                 */
                public static fromObject(object: { [k: string]: any }): tools.simrail.backend.User;

                /**
                 * Creates a plain object from a User message. Also converts values to other types if specified.
                 * @param message User
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: tools.simrail.backend.User, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this User to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for User
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of an IdHolder. */
            interface IIdHolder {

                /** IdHolder dataId */
                dataId?: (string|undefined);

                /** IdHolder serverId */
                serverId?: (string|undefined);

                /** IdHolder foreignId */
                foreignId?: (string|undefined);
            }

            /** Represents an IdHolder. */
            class IdHolder implements IIdHolder {

                /**
                 * Constructs a new IdHolder.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: tools.simrail.backend.IIdHolder);

                /** IdHolder dataId. */
                public dataId: string;

                /** IdHolder serverId. */
                public serverId: string;

                /** IdHolder foreignId. */
                public foreignId: string;

                /**
                 * Encodes the specified IdHolder message. Does not implicitly {@link tools.simrail.backend.IdHolder.verify|verify} messages.
                 * @param message IdHolder message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: tools.simrail.backend.IIdHolder, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified IdHolder message, length delimited. Does not implicitly {@link tools.simrail.backend.IdHolder.verify|verify} messages.
                 * @param message IdHolder message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: tools.simrail.backend.IIdHolder, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an IdHolder message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns IdHolder
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tools.simrail.backend.IdHolder;

                /**
                 * Decodes an IdHolder message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns IdHolder
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tools.simrail.backend.IdHolder;

                /**
                 * Verifies an IdHolder message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an IdHolder message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns IdHolder
                 */
                public static fromObject(object: { [k: string]: any }): tools.simrail.backend.IdHolder;

                /**
                 * Creates a plain object from an IdHolder message. Also converts values to other types if specified.
                 * @param message IdHolder
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: tools.simrail.backend.IdHolder, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this IdHolder to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for IdHolder
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a JourneyData. */
            interface IJourneyData {

                /** JourneyData speed */
                speed?: (number|undefined);

                /** JourneyData position */
                position?: (tools.simrail.backend.IGeoPosition|undefined);

                /** JourneyData driver */
                driver?: (tools.simrail.backend.IUser|null|undefined);

                /** JourneyData nextSignal */
                nextSignal?: (tools.simrail.backend.ISignalInfo|null|undefined);

                /** JourneyData currentPointId */
                currentPointId?: (string|null|undefined);
            }

            /** Represents a JourneyData. */
            class JourneyData implements IJourneyData {

                /**
                 * Constructs a new JourneyData.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: tools.simrail.backend.IJourneyData);

                /** JourneyData speed. */
                public speed: number;

                /** JourneyData position. */
                public position: tools.simrail.backend.GeoPosition;

                /** JourneyData driver. */
                public driver: (tools.simrail.backend.User|null);

                /** JourneyData nextSignal. */
                public nextSignal: (tools.simrail.backend.SignalInfo|null);

                /** JourneyData currentPointId. */
                public currentPointId: (string|null);

                /**
                 * Encodes the specified JourneyData message. Does not implicitly {@link tools.simrail.backend.JourneyData.verify|verify} messages.
                 * @param message JourneyData message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: tools.simrail.backend.IJourneyData, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified JourneyData message, length delimited. Does not implicitly {@link tools.simrail.backend.JourneyData.verify|verify} messages.
                 * @param message JourneyData message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: tools.simrail.backend.IJourneyData, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a JourneyData message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns JourneyData
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tools.simrail.backend.JourneyData;

                /**
                 * Decodes a JourneyData message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns JourneyData
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tools.simrail.backend.JourneyData;

                /**
                 * Verifies a JourneyData message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a JourneyData message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns JourneyData
                 */
                public static fromObject(object: { [k: string]: any }): tools.simrail.backend.JourneyData;

                /**
                 * Creates a plain object from a JourneyData message. Also converts values to other types if specified.
                 * @param message JourneyData
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: tools.simrail.backend.JourneyData, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this JourneyData to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for JourneyData
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a DispatchPostData. */
            interface IDispatchPostData {

                /** DispatchPostData dispatcher */
                dispatcher?: (tools.simrail.backend.IUser|null|undefined);
            }

            /** Represents a DispatchPostData. */
            class DispatchPostData implements IDispatchPostData {

                /**
                 * Constructs a new DispatchPostData.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: tools.simrail.backend.IDispatchPostData);

                /** DispatchPostData dispatcher. */
                public dispatcher: (tools.simrail.backend.User|null);

                /**
                 * Encodes the specified DispatchPostData message. Does not implicitly {@link tools.simrail.backend.DispatchPostData.verify|verify} messages.
                 * @param message DispatchPostData message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: tools.simrail.backend.IDispatchPostData, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified DispatchPostData message, length delimited. Does not implicitly {@link tools.simrail.backend.DispatchPostData.verify|verify} messages.
                 * @param message DispatchPostData message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: tools.simrail.backend.IDispatchPostData, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a DispatchPostData message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns DispatchPostData
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tools.simrail.backend.DispatchPostData;

                /**
                 * Decodes a DispatchPostData message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns DispatchPostData
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tools.simrail.backend.DispatchPostData;

                /**
                 * Verifies a DispatchPostData message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a DispatchPostData message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns DispatchPostData
                 */
                public static fromObject(object: { [k: string]: any }): tools.simrail.backend.DispatchPostData;

                /**
                 * Creates a plain object from a DispatchPostData message. Also converts values to other types if specified.
                 * @param message DispatchPostData
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: tools.simrail.backend.DispatchPostData, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this DispatchPostData to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for DispatchPostData
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a ServerData. */
            interface IServerData {

                /** ServerData online */
                online?: (boolean|undefined);

                /** ServerData scenery */
                scenery?: (string|undefined);

                /** ServerData utcOffsetSeconds */
                utcOffsetSeconds?: (Long|undefined);

                /** ServerData spokenLanguage */
                spokenLanguage?: (string|null|undefined);

                /** ServerData tags */
                tags?: (string[]|undefined);
            }

            /** Represents a ServerData. */
            class ServerData implements IServerData {

                /**
                 * Constructs a new ServerData.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: tools.simrail.backend.IServerData);

                /** ServerData online. */
                public online: boolean;

                /** ServerData scenery. */
                public scenery: string;

                /** ServerData utcOffsetSeconds. */
                public utcOffsetSeconds: Long;

                /** ServerData spokenLanguage. */
                public spokenLanguage: (string|null);

                /** ServerData tags. */
                public tags: string[];

                /**
                 * Encodes the specified ServerData message. Does not implicitly {@link tools.simrail.backend.ServerData.verify|verify} messages.
                 * @param message ServerData message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: tools.simrail.backend.IServerData, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ServerData message, length delimited. Does not implicitly {@link tools.simrail.backend.ServerData.verify|verify} messages.
                 * @param message ServerData message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: tools.simrail.backend.IServerData, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ServerData message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ServerData
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tools.simrail.backend.ServerData;

                /**
                 * Decodes a ServerData message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ServerData
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tools.simrail.backend.ServerData;

                /**
                 * Verifies a ServerData message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ServerData message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ServerData
                 */
                public static fromObject(object: { [k: string]: any }): tools.simrail.backend.ServerData;

                /**
                 * Creates a plain object from a ServerData message. Also converts values to other types if specified.
                 * @param message ServerData
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: tools.simrail.backend.ServerData, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ServerData to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for ServerData
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a BaseFrameData. */
            interface IBaseFrameData {

                /** BaseFrameData timestamp */
                timestamp?: (Long|undefined);
            }

            /** Represents a BaseFrameData. */
            class BaseFrameData implements IBaseFrameData {

                /**
                 * Constructs a new BaseFrameData.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: tools.simrail.backend.IBaseFrameData);

                /** BaseFrameData timestamp. */
                public timestamp: Long;

                /**
                 * Encodes the specified BaseFrameData message. Does not implicitly {@link tools.simrail.backend.BaseFrameData.verify|verify} messages.
                 * @param message BaseFrameData message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: tools.simrail.backend.IBaseFrameData, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified BaseFrameData message, length delimited. Does not implicitly {@link tools.simrail.backend.BaseFrameData.verify|verify} messages.
                 * @param message BaseFrameData message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: tools.simrail.backend.IBaseFrameData, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a BaseFrameData message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns BaseFrameData
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tools.simrail.backend.BaseFrameData;

                /**
                 * Decodes a BaseFrameData message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns BaseFrameData
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tools.simrail.backend.BaseFrameData;

                /**
                 * Verifies a BaseFrameData message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a BaseFrameData message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns BaseFrameData
                 */
                public static fromObject(object: { [k: string]: any }): tools.simrail.backend.BaseFrameData;

                /**
                 * Creates a plain object from a BaseFrameData message. Also converts values to other types if specified.
                 * @param message BaseFrameData
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: tools.simrail.backend.BaseFrameData, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this BaseFrameData to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for BaseFrameData
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a JourneyUpdateFrame. */
            interface IJourneyUpdateFrame {

                /** JourneyUpdateFrame baseData */
                baseData?: (tools.simrail.backend.IBaseFrameData|undefined);

                /** JourneyUpdateFrame ids */
                ids?: (tools.simrail.backend.IIdHolder|undefined);

                /** JourneyUpdateFrame journeyData */
                journeyData?: (tools.simrail.backend.IJourneyData|undefined);
            }

            /** Represents a JourneyUpdateFrame. */
            class JourneyUpdateFrame implements IJourneyUpdateFrame {

                /**
                 * Constructs a new JourneyUpdateFrame.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: tools.simrail.backend.IJourneyUpdateFrame);

                /** JourneyUpdateFrame baseData. */
                public baseData: tools.simrail.backend.BaseFrameData;

                /** JourneyUpdateFrame ids. */
                public ids: tools.simrail.backend.IdHolder;

                /** JourneyUpdateFrame journeyData. */
                public journeyData: tools.simrail.backend.JourneyData;

                /**
                 * Encodes the specified JourneyUpdateFrame message. Does not implicitly {@link tools.simrail.backend.JourneyUpdateFrame.verify|verify} messages.
                 * @param message JourneyUpdateFrame message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: tools.simrail.backend.IJourneyUpdateFrame, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified JourneyUpdateFrame message, length delimited. Does not implicitly {@link tools.simrail.backend.JourneyUpdateFrame.verify|verify} messages.
                 * @param message JourneyUpdateFrame message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: tools.simrail.backend.IJourneyUpdateFrame, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a JourneyUpdateFrame message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns JourneyUpdateFrame
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tools.simrail.backend.JourneyUpdateFrame;

                /**
                 * Decodes a JourneyUpdateFrame message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns JourneyUpdateFrame
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tools.simrail.backend.JourneyUpdateFrame;

                /**
                 * Verifies a JourneyUpdateFrame message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a JourneyUpdateFrame message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns JourneyUpdateFrame
                 */
                public static fromObject(object: { [k: string]: any }): tools.simrail.backend.JourneyUpdateFrame;

                /**
                 * Creates a plain object from a JourneyUpdateFrame message. Also converts values to other types if specified.
                 * @param message JourneyUpdateFrame
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: tools.simrail.backend.JourneyUpdateFrame, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this JourneyUpdateFrame to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for JourneyUpdateFrame
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a JourneyRemoveFrame. */
            interface IJourneyRemoveFrame {

                /** JourneyRemoveFrame baseData */
                baseData?: (tools.simrail.backend.IBaseFrameData|undefined);

                /** JourneyRemoveFrame journeyId */
                journeyId?: (string|undefined);
            }

            /** Represents a JourneyRemoveFrame. */
            class JourneyRemoveFrame implements IJourneyRemoveFrame {

                /**
                 * Constructs a new JourneyRemoveFrame.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: tools.simrail.backend.IJourneyRemoveFrame);

                /** JourneyRemoveFrame baseData. */
                public baseData: tools.simrail.backend.BaseFrameData;

                /** JourneyRemoveFrame journeyId. */
                public journeyId: string;

                /**
                 * Encodes the specified JourneyRemoveFrame message. Does not implicitly {@link tools.simrail.backend.JourneyRemoveFrame.verify|verify} messages.
                 * @param message JourneyRemoveFrame message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: tools.simrail.backend.IJourneyRemoveFrame, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified JourneyRemoveFrame message, length delimited. Does not implicitly {@link tools.simrail.backend.JourneyRemoveFrame.verify|verify} messages.
                 * @param message JourneyRemoveFrame message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: tools.simrail.backend.IJourneyRemoveFrame, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a JourneyRemoveFrame message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns JourneyRemoveFrame
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tools.simrail.backend.JourneyRemoveFrame;

                /**
                 * Decodes a JourneyRemoveFrame message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns JourneyRemoveFrame
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tools.simrail.backend.JourneyRemoveFrame;

                /**
                 * Verifies a JourneyRemoveFrame message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a JourneyRemoveFrame message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns JourneyRemoveFrame
                 */
                public static fromObject(object: { [k: string]: any }): tools.simrail.backend.JourneyRemoveFrame;

                /**
                 * Creates a plain object from a JourneyRemoveFrame message. Also converts values to other types if specified.
                 * @param message JourneyRemoveFrame
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: tools.simrail.backend.JourneyRemoveFrame, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this JourneyRemoveFrame to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for JourneyRemoveFrame
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a DispatchPostUpdateFrame. */
            interface IDispatchPostUpdateFrame {

                /** DispatchPostUpdateFrame baseData */
                baseData?: (tools.simrail.backend.IBaseFrameData|undefined);

                /** DispatchPostUpdateFrame ids */
                ids?: (tools.simrail.backend.IIdHolder|undefined);

                /** DispatchPostUpdateFrame dispatchPostData */
                dispatchPostData?: (tools.simrail.backend.IDispatchPostData|undefined);
            }

            /** Represents a DispatchPostUpdateFrame. */
            class DispatchPostUpdateFrame implements IDispatchPostUpdateFrame {

                /**
                 * Constructs a new DispatchPostUpdateFrame.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: tools.simrail.backend.IDispatchPostUpdateFrame);

                /** DispatchPostUpdateFrame baseData. */
                public baseData: tools.simrail.backend.BaseFrameData;

                /** DispatchPostUpdateFrame ids. */
                public ids: tools.simrail.backend.IdHolder;

                /** DispatchPostUpdateFrame dispatchPostData. */
                public dispatchPostData: tools.simrail.backend.DispatchPostData;

                /**
                 * Encodes the specified DispatchPostUpdateFrame message. Does not implicitly {@link tools.simrail.backend.DispatchPostUpdateFrame.verify|verify} messages.
                 * @param message DispatchPostUpdateFrame message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: tools.simrail.backend.IDispatchPostUpdateFrame, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified DispatchPostUpdateFrame message, length delimited. Does not implicitly {@link tools.simrail.backend.DispatchPostUpdateFrame.verify|verify} messages.
                 * @param message DispatchPostUpdateFrame message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: tools.simrail.backend.IDispatchPostUpdateFrame, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a DispatchPostUpdateFrame message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns DispatchPostUpdateFrame
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tools.simrail.backend.DispatchPostUpdateFrame;

                /**
                 * Decodes a DispatchPostUpdateFrame message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns DispatchPostUpdateFrame
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tools.simrail.backend.DispatchPostUpdateFrame;

                /**
                 * Verifies a DispatchPostUpdateFrame message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a DispatchPostUpdateFrame message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns DispatchPostUpdateFrame
                 */
                public static fromObject(object: { [k: string]: any }): tools.simrail.backend.DispatchPostUpdateFrame;

                /**
                 * Creates a plain object from a DispatchPostUpdateFrame message. Also converts values to other types if specified.
                 * @param message DispatchPostUpdateFrame
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: tools.simrail.backend.DispatchPostUpdateFrame, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this DispatchPostUpdateFrame to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for DispatchPostUpdateFrame
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a DispatchPostRemoveFrame. */
            interface IDispatchPostRemoveFrame {

                /** DispatchPostRemoveFrame baseData */
                baseData?: (tools.simrail.backend.IBaseFrameData|undefined);

                /** DispatchPostRemoveFrame postId */
                postId?: (string|undefined);
            }

            /** Represents a DispatchPostRemoveFrame. */
            class DispatchPostRemoveFrame implements IDispatchPostRemoveFrame {

                /**
                 * Constructs a new DispatchPostRemoveFrame.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: tools.simrail.backend.IDispatchPostRemoveFrame);

                /** DispatchPostRemoveFrame baseData. */
                public baseData: tools.simrail.backend.BaseFrameData;

                /** DispatchPostRemoveFrame postId. */
                public postId: string;

                /**
                 * Encodes the specified DispatchPostRemoveFrame message. Does not implicitly {@link tools.simrail.backend.DispatchPostRemoveFrame.verify|verify} messages.
                 * @param message DispatchPostRemoveFrame message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: tools.simrail.backend.IDispatchPostRemoveFrame, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified DispatchPostRemoveFrame message, length delimited. Does not implicitly {@link tools.simrail.backend.DispatchPostRemoveFrame.verify|verify} messages.
                 * @param message DispatchPostRemoveFrame message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: tools.simrail.backend.IDispatchPostRemoveFrame, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a DispatchPostRemoveFrame message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns DispatchPostRemoveFrame
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tools.simrail.backend.DispatchPostRemoveFrame;

                /**
                 * Decodes a DispatchPostRemoveFrame message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns DispatchPostRemoveFrame
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tools.simrail.backend.DispatchPostRemoveFrame;

                /**
                 * Verifies a DispatchPostRemoveFrame message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a DispatchPostRemoveFrame message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns DispatchPostRemoveFrame
                 */
                public static fromObject(object: { [k: string]: any }): tools.simrail.backend.DispatchPostRemoveFrame;

                /**
                 * Creates a plain object from a DispatchPostRemoveFrame message. Also converts values to other types if specified.
                 * @param message DispatchPostRemoveFrame
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: tools.simrail.backend.DispatchPostRemoveFrame, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this DispatchPostRemoveFrame to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for DispatchPostRemoveFrame
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a ServerUpdateFrame. */
            interface IServerUpdateFrame {

                /** ServerUpdateFrame baseData */
                baseData?: (tools.simrail.backend.IBaseFrameData|undefined);

                /** ServerUpdateFrame ids */
                ids?: (tools.simrail.backend.IIdHolder|undefined);

                /** ServerUpdateFrame serverData */
                serverData?: (tools.simrail.backend.IServerData|undefined);
            }

            /** Represents a ServerUpdateFrame. */
            class ServerUpdateFrame implements IServerUpdateFrame {

                /**
                 * Constructs a new ServerUpdateFrame.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: tools.simrail.backend.IServerUpdateFrame);

                /** ServerUpdateFrame baseData. */
                public baseData: tools.simrail.backend.BaseFrameData;

                /** ServerUpdateFrame ids. */
                public ids: tools.simrail.backend.IdHolder;

                /** ServerUpdateFrame serverData. */
                public serverData: tools.simrail.backend.ServerData;

                /**
                 * Encodes the specified ServerUpdateFrame message. Does not implicitly {@link tools.simrail.backend.ServerUpdateFrame.verify|verify} messages.
                 * @param message ServerUpdateFrame message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: tools.simrail.backend.IServerUpdateFrame, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ServerUpdateFrame message, length delimited. Does not implicitly {@link tools.simrail.backend.ServerUpdateFrame.verify|verify} messages.
                 * @param message ServerUpdateFrame message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: tools.simrail.backend.IServerUpdateFrame, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ServerUpdateFrame message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ServerUpdateFrame
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tools.simrail.backend.ServerUpdateFrame;

                /**
                 * Decodes a ServerUpdateFrame message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ServerUpdateFrame
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tools.simrail.backend.ServerUpdateFrame;

                /**
                 * Verifies a ServerUpdateFrame message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ServerUpdateFrame message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ServerUpdateFrame
                 */
                public static fromObject(object: { [k: string]: any }): tools.simrail.backend.ServerUpdateFrame;

                /**
                 * Creates a plain object from a ServerUpdateFrame message. Also converts values to other types if specified.
                 * @param message ServerUpdateFrame
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: tools.simrail.backend.ServerUpdateFrame, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ServerUpdateFrame to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for ServerUpdateFrame
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a ServerRemoveFrame. */
            interface IServerRemoveFrame {

                /** ServerRemoveFrame baseData */
                baseData?: (tools.simrail.backend.IBaseFrameData|undefined);

                /** ServerRemoveFrame serverId */
                serverId?: (string|undefined);
            }

            /** Represents a ServerRemoveFrame. */
            class ServerRemoveFrame implements IServerRemoveFrame {

                /**
                 * Constructs a new ServerRemoveFrame.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: tools.simrail.backend.IServerRemoveFrame);

                /** ServerRemoveFrame baseData. */
                public baseData: tools.simrail.backend.BaseFrameData;

                /** ServerRemoveFrame serverId. */
                public serverId: string;

                /**
                 * Encodes the specified ServerRemoveFrame message. Does not implicitly {@link tools.simrail.backend.ServerRemoveFrame.verify|verify} messages.
                 * @param message ServerRemoveFrame message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: tools.simrail.backend.IServerRemoveFrame, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ServerRemoveFrame message, length delimited. Does not implicitly {@link tools.simrail.backend.ServerRemoveFrame.verify|verify} messages.
                 * @param message ServerRemoveFrame message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: tools.simrail.backend.IServerRemoveFrame, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ServerRemoveFrame message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ServerRemoveFrame
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tools.simrail.backend.ServerRemoveFrame;

                /**
                 * Decodes a ServerRemoveFrame message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ServerRemoveFrame
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tools.simrail.backend.ServerRemoveFrame;

                /**
                 * Verifies a ServerRemoveFrame message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ServerRemoveFrame message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ServerRemoveFrame
                 */
                public static fromObject(object: { [k: string]: any }): tools.simrail.backend.ServerRemoveFrame;

                /**
                 * Creates a plain object from a ServerRemoveFrame message. Also converts values to other types if specified.
                 * @param message ServerRemoveFrame
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: tools.simrail.backend.ServerRemoveFrame, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ServerRemoveFrame to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for ServerRemoveFrame
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }
        }
    }
}
