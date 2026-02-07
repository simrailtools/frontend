/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const tools = $root.tools = (() => {

    /**
     * Namespace tools.
     * @exports tools
     * @namespace
     */
    const tools = {};

    tools.simrail = (function() {

        /**
         * Namespace simrail.
         * @memberof tools
         * @namespace
         */
        const simrail = {};

        simrail.backend = (function() {

            /**
             * Namespace backend.
             * @memberof tools.simrail
             * @namespace
             */
            const backend = {};

            backend.GeoPosition = (function() {

                /**
                 * Properties of a GeoPosition.
                 * @memberof tools.simrail.backend
                 * @interface IGeoPosition
                 * @property {number|undefined} [latitude] GeoPosition latitude
                 * @property {number|undefined} [longitude] GeoPosition longitude
                 */

                /**
                 * Constructs a new GeoPosition.
                 * @memberof tools.simrail.backend
                 * @classdesc Represents a GeoPosition.
                 * @implements IGeoPosition
                 * @constructor
                 * @param {tools.simrail.backend.IGeoPosition=} [properties] Properties to set
                 */
                function GeoPosition(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * GeoPosition latitude.
                 * @member {number} latitude
                 * @memberof tools.simrail.backend.GeoPosition
                 * @instance
                 */
                GeoPosition.prototype.latitude = 0;

                /**
                 * GeoPosition longitude.
                 * @member {number} longitude
                 * @memberof tools.simrail.backend.GeoPosition
                 * @instance
                 */
                GeoPosition.prototype.longitude = 0;

                /**
                 * Encodes the specified GeoPosition message. Does not implicitly {@link tools.simrail.backend.GeoPosition.verify|verify} messages.
                 * @function encode
                 * @memberof tools.simrail.backend.GeoPosition
                 * @static
                 * @param {tools.simrail.backend.IGeoPosition} message GeoPosition message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GeoPosition.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.latitude != null && Object.hasOwnProperty.call(message, "latitude"))
                        writer.uint32(/* id 1, wireType 1 =*/9).double(message.latitude);
                    if (message.longitude != null && Object.hasOwnProperty.call(message, "longitude"))
                        writer.uint32(/* id 2, wireType 1 =*/17).double(message.longitude);
                    return writer;
                };

                /**
                 * Encodes the specified GeoPosition message, length delimited. Does not implicitly {@link tools.simrail.backend.GeoPosition.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof tools.simrail.backend.GeoPosition
                 * @static
                 * @param {tools.simrail.backend.IGeoPosition} message GeoPosition message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GeoPosition.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a GeoPosition message from the specified reader or buffer.
                 * @function decode
                 * @memberof tools.simrail.backend.GeoPosition
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {tools.simrail.backend.GeoPosition} GeoPosition
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GeoPosition.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.tools.simrail.backend.GeoPosition();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.latitude = reader.double();
                                break;
                            }
                        case 2: {
                                message.longitude = reader.double();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a GeoPosition message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof tools.simrail.backend.GeoPosition
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {tools.simrail.backend.GeoPosition} GeoPosition
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GeoPosition.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a GeoPosition message.
                 * @function verify
                 * @memberof tools.simrail.backend.GeoPosition
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                GeoPosition.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.latitude != null && message.hasOwnProperty("latitude"))
                        if (typeof message.latitude !== "number")
                            return "latitude: number expected";
                    if (message.longitude != null && message.hasOwnProperty("longitude"))
                        if (typeof message.longitude !== "number")
                            return "longitude: number expected";
                    return null;
                };

                /**
                 * Creates a GeoPosition message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof tools.simrail.backend.GeoPosition
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {tools.simrail.backend.GeoPosition} GeoPosition
                 */
                GeoPosition.fromObject = function fromObject(object) {
                    if (object instanceof $root.tools.simrail.backend.GeoPosition)
                        return object;
                    let message = new $root.tools.simrail.backend.GeoPosition();
                    if (object.latitude != null)
                        message.latitude = Number(object.latitude);
                    if (object.longitude != null)
                        message.longitude = Number(object.longitude);
                    return message;
                };

                /**
                 * Creates a plain object from a GeoPosition message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof tools.simrail.backend.GeoPosition
                 * @static
                 * @param {tools.simrail.backend.GeoPosition} message GeoPosition
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                GeoPosition.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.latitude = 0;
                        object.longitude = 0;
                    }
                    if (message.latitude != null && message.hasOwnProperty("latitude"))
                        object.latitude = options.json && !isFinite(message.latitude) ? String(message.latitude) : message.latitude;
                    if (message.longitude != null && message.hasOwnProperty("longitude"))
                        object.longitude = options.json && !isFinite(message.longitude) ? String(message.longitude) : message.longitude;
                    return object;
                };

                /**
                 * Converts this GeoPosition to JSON.
                 * @function toJSON
                 * @memberof tools.simrail.backend.GeoPosition
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                GeoPosition.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for GeoPosition
                 * @function getTypeUrl
                 * @memberof tools.simrail.backend.GeoPosition
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                GeoPosition.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/tools.simrail.backend.GeoPosition";
                };

                return GeoPosition;
            })();

            backend.SignalInfo = (function() {

                /**
                 * Properties of a SignalInfo.
                 * @memberof tools.simrail.backend
                 * @interface ISignalInfo
                 * @property {string|undefined} [name] SignalInfo name
                 * @property {number|undefined} [distanceMeters] SignalInfo distanceMeters
                 * @property {number|null|undefined} [maxSpeedKmh] SignalInfo maxSpeedKmh
                 */

                /**
                 * Constructs a new SignalInfo.
                 * @memberof tools.simrail.backend
                 * @classdesc Represents a SignalInfo.
                 * @implements ISignalInfo
                 * @constructor
                 * @param {tools.simrail.backend.ISignalInfo=} [properties] Properties to set
                 */
                function SignalInfo(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * SignalInfo name.
                 * @member {string} name
                 * @memberof tools.simrail.backend.SignalInfo
                 * @instance
                 */
                SignalInfo.prototype.name = "";

                /**
                 * SignalInfo distanceMeters.
                 * @member {number} distanceMeters
                 * @memberof tools.simrail.backend.SignalInfo
                 * @instance
                 */
                SignalInfo.prototype.distanceMeters = 0;

                /**
                 * SignalInfo maxSpeedKmh.
                 * @member {number|null} maxSpeedKmh
                 * @memberof tools.simrail.backend.SignalInfo
                 * @instance
                 */
                SignalInfo.prototype.maxSpeedKmh = null;

                // OneOf field names bound to virtual getters and setters
                let $oneOfFields;

                // Virtual OneOf for proto3 optional field
                Object.defineProperty(SignalInfo.prototype, "_maxSpeedKmh", {
                    get: $util.oneOfGetter($oneOfFields = ["maxSpeedKmh"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                /**
                 * Encodes the specified SignalInfo message. Does not implicitly {@link tools.simrail.backend.SignalInfo.verify|verify} messages.
                 * @function encode
                 * @memberof tools.simrail.backend.SignalInfo
                 * @static
                 * @param {tools.simrail.backend.ISignalInfo} message SignalInfo message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                SignalInfo.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
                    if (message.distanceMeters != null && Object.hasOwnProperty.call(message, "distanceMeters"))
                        writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.distanceMeters);
                    if (message.maxSpeedKmh != null && Object.hasOwnProperty.call(message, "maxSpeedKmh"))
                        writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.maxSpeedKmh);
                    return writer;
                };

                /**
                 * Encodes the specified SignalInfo message, length delimited. Does not implicitly {@link tools.simrail.backend.SignalInfo.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof tools.simrail.backend.SignalInfo
                 * @static
                 * @param {tools.simrail.backend.ISignalInfo} message SignalInfo message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                SignalInfo.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a SignalInfo message from the specified reader or buffer.
                 * @function decode
                 * @memberof tools.simrail.backend.SignalInfo
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {tools.simrail.backend.SignalInfo} SignalInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                SignalInfo.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.tools.simrail.backend.SignalInfo();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.name = reader.string();
                                break;
                            }
                        case 2: {
                                message.distanceMeters = reader.uint32();
                                break;
                            }
                        case 3: {
                                message.maxSpeedKmh = reader.uint32();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a SignalInfo message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof tools.simrail.backend.SignalInfo
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {tools.simrail.backend.SignalInfo} SignalInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                SignalInfo.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a SignalInfo message.
                 * @function verify
                 * @memberof tools.simrail.backend.SignalInfo
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                SignalInfo.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    let properties = {};
                    if (message.name != null && message.hasOwnProperty("name"))
                        if (!$util.isString(message.name))
                            return "name: string expected";
                    if (message.distanceMeters != null && message.hasOwnProperty("distanceMeters"))
                        if (!$util.isInteger(message.distanceMeters))
                            return "distanceMeters: integer expected";
                    if (message.maxSpeedKmh != null && message.hasOwnProperty("maxSpeedKmh")) {
                        properties._maxSpeedKmh = 1;
                        if (!$util.isInteger(message.maxSpeedKmh))
                            return "maxSpeedKmh: integer expected";
                    }
                    return null;
                };

                /**
                 * Creates a SignalInfo message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof tools.simrail.backend.SignalInfo
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {tools.simrail.backend.SignalInfo} SignalInfo
                 */
                SignalInfo.fromObject = function fromObject(object) {
                    if (object instanceof $root.tools.simrail.backend.SignalInfo)
                        return object;
                    let message = new $root.tools.simrail.backend.SignalInfo();
                    if (object.name != null)
                        message.name = String(object.name);
                    if (object.distanceMeters != null)
                        message.distanceMeters = object.distanceMeters >>> 0;
                    if (object.maxSpeedKmh != null)
                        message.maxSpeedKmh = object.maxSpeedKmh >>> 0;
                    return message;
                };

                /**
                 * Creates a plain object from a SignalInfo message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof tools.simrail.backend.SignalInfo
                 * @static
                 * @param {tools.simrail.backend.SignalInfo} message SignalInfo
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                SignalInfo.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.name = "";
                        object.distanceMeters = 0;
                    }
                    if (message.name != null && message.hasOwnProperty("name"))
                        object.name = message.name;
                    if (message.distanceMeters != null && message.hasOwnProperty("distanceMeters"))
                        object.distanceMeters = message.distanceMeters;
                    if (message.maxSpeedKmh != null && message.hasOwnProperty("maxSpeedKmh")) {
                        object.maxSpeedKmh = message.maxSpeedKmh;
                        if (options.oneofs)
                            object._maxSpeedKmh = "maxSpeedKmh";
                    }
                    return object;
                };

                /**
                 * Converts this SignalInfo to JSON.
                 * @function toJSON
                 * @memberof tools.simrail.backend.SignalInfo
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                SignalInfo.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for SignalInfo
                 * @function getTypeUrl
                 * @memberof tools.simrail.backend.SignalInfo
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                SignalInfo.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/tools.simrail.backend.SignalInfo";
                };

                return SignalInfo;
            })();

            /**
             * UserPlatform enum.
             * @name tools.simrail.backend.UserPlatform
             * @enum {number}
             * @property {number} STEAM=0 STEAM value
             * @property {number} XBOX=1 XBOX value
             */
            backend.UserPlatform = (function() {
                const valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "STEAM"] = 0;
                values[valuesById[1] = "XBOX"] = 1;
                return values;
            })();

            backend.User = (function() {

                /**
                 * Properties of a User.
                 * @memberof tools.simrail.backend
                 * @interface IUser
                 * @property {string|undefined} [id] User id
                 * @property {tools.simrail.backend.UserPlatform|undefined} [platform] User platform
                 */

                /**
                 * Constructs a new User.
                 * @memberof tools.simrail.backend
                 * @classdesc Represents a User.
                 * @implements IUser
                 * @constructor
                 * @param {tools.simrail.backend.IUser=} [properties] Properties to set
                 */
                function User(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * User id.
                 * @member {string} id
                 * @memberof tools.simrail.backend.User
                 * @instance
                 */
                User.prototype.id = "";

                /**
                 * User platform.
                 * @member {tools.simrail.backend.UserPlatform} platform
                 * @memberof tools.simrail.backend.User
                 * @instance
                 */
                User.prototype.platform = 0;

                /**
                 * Encodes the specified User message. Does not implicitly {@link tools.simrail.backend.User.verify|verify} messages.
                 * @function encode
                 * @memberof tools.simrail.backend.User
                 * @static
                 * @param {tools.simrail.backend.IUser} message User message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                User.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                    if (message.platform != null && Object.hasOwnProperty.call(message, "platform"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.platform);
                    return writer;
                };

                /**
                 * Encodes the specified User message, length delimited. Does not implicitly {@link tools.simrail.backend.User.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof tools.simrail.backend.User
                 * @static
                 * @param {tools.simrail.backend.IUser} message User message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                User.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a User message from the specified reader or buffer.
                 * @function decode
                 * @memberof tools.simrail.backend.User
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {tools.simrail.backend.User} User
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                User.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.tools.simrail.backend.User();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.id = reader.string();
                                break;
                            }
                        case 2: {
                                message.platform = reader.int32();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a User message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof tools.simrail.backend.User
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {tools.simrail.backend.User} User
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                User.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a User message.
                 * @function verify
                 * @memberof tools.simrail.backend.User
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                User.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.id != null && message.hasOwnProperty("id"))
                        if (!$util.isString(message.id))
                            return "id: string expected";
                    if (message.platform != null && message.hasOwnProperty("platform"))
                        switch (message.platform) {
                        default:
                            return "platform: enum value expected";
                        case 0:
                        case 1:
                            break;
                        }
                    return null;
                };

                /**
                 * Creates a User message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof tools.simrail.backend.User
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {tools.simrail.backend.User} User
                 */
                User.fromObject = function fromObject(object) {
                    if (object instanceof $root.tools.simrail.backend.User)
                        return object;
                    let message = new $root.tools.simrail.backend.User();
                    if (object.id != null)
                        message.id = String(object.id);
                    switch (object.platform) {
                    default:
                        if (typeof object.platform === "number") {
                            message.platform = object.platform;
                            break;
                        }
                        break;
                    case "STEAM":
                    case 0:
                        message.platform = 0;
                        break;
                    case "XBOX":
                    case 1:
                        message.platform = 1;
                        break;
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a User message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof tools.simrail.backend.User
                 * @static
                 * @param {tools.simrail.backend.User} message User
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                User.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.id = "";
                        object.platform = options.enums === String ? "STEAM" : 0;
                    }
                    if (message.id != null && message.hasOwnProperty("id"))
                        object.id = message.id;
                    if (message.platform != null && message.hasOwnProperty("platform"))
                        object.platform = options.enums === String ? $root.tools.simrail.backend.UserPlatform[message.platform] === undefined ? message.platform : $root.tools.simrail.backend.UserPlatform[message.platform] : message.platform;
                    return object;
                };

                /**
                 * Converts this User to JSON.
                 * @function toJSON
                 * @memberof tools.simrail.backend.User
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                User.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for User
                 * @function getTypeUrl
                 * @memberof tools.simrail.backend.User
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                User.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/tools.simrail.backend.User";
                };

                return User;
            })();

            backend.IdHolder = (function() {

                /**
                 * Properties of an IdHolder.
                 * @memberof tools.simrail.backend
                 * @interface IIdHolder
                 * @property {string|undefined} [dataId] IdHolder dataId
                 * @property {string|undefined} [serverId] IdHolder serverId
                 * @property {string|undefined} [foreignId] IdHolder foreignId
                 */

                /**
                 * Constructs a new IdHolder.
                 * @memberof tools.simrail.backend
                 * @classdesc Represents an IdHolder.
                 * @implements IIdHolder
                 * @constructor
                 * @param {tools.simrail.backend.IIdHolder=} [properties] Properties to set
                 */
                function IdHolder(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * IdHolder dataId.
                 * @member {string} dataId
                 * @memberof tools.simrail.backend.IdHolder
                 * @instance
                 */
                IdHolder.prototype.dataId = "";

                /**
                 * IdHolder serverId.
                 * @member {string} serverId
                 * @memberof tools.simrail.backend.IdHolder
                 * @instance
                 */
                IdHolder.prototype.serverId = "";

                /**
                 * IdHolder foreignId.
                 * @member {string} foreignId
                 * @memberof tools.simrail.backend.IdHolder
                 * @instance
                 */
                IdHolder.prototype.foreignId = "";

                /**
                 * Encodes the specified IdHolder message. Does not implicitly {@link tools.simrail.backend.IdHolder.verify|verify} messages.
                 * @function encode
                 * @memberof tools.simrail.backend.IdHolder
                 * @static
                 * @param {tools.simrail.backend.IIdHolder} message IdHolder message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                IdHolder.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.dataId != null && Object.hasOwnProperty.call(message, "dataId"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.dataId);
                    if (message.serverId != null && Object.hasOwnProperty.call(message, "serverId"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.serverId);
                    if (message.foreignId != null && Object.hasOwnProperty.call(message, "foreignId"))
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.foreignId);
                    return writer;
                };

                /**
                 * Encodes the specified IdHolder message, length delimited. Does not implicitly {@link tools.simrail.backend.IdHolder.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof tools.simrail.backend.IdHolder
                 * @static
                 * @param {tools.simrail.backend.IIdHolder} message IdHolder message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                IdHolder.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes an IdHolder message from the specified reader or buffer.
                 * @function decode
                 * @memberof tools.simrail.backend.IdHolder
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {tools.simrail.backend.IdHolder} IdHolder
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                IdHolder.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.tools.simrail.backend.IdHolder();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.dataId = reader.string();
                                break;
                            }
                        case 2: {
                                message.serverId = reader.string();
                                break;
                            }
                        case 3: {
                                message.foreignId = reader.string();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes an IdHolder message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof tools.simrail.backend.IdHolder
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {tools.simrail.backend.IdHolder} IdHolder
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                IdHolder.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an IdHolder message.
                 * @function verify
                 * @memberof tools.simrail.backend.IdHolder
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                IdHolder.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.dataId != null && message.hasOwnProperty("dataId"))
                        if (!$util.isString(message.dataId))
                            return "dataId: string expected";
                    if (message.serverId != null && message.hasOwnProperty("serverId"))
                        if (!$util.isString(message.serverId))
                            return "serverId: string expected";
                    if (message.foreignId != null && message.hasOwnProperty("foreignId"))
                        if (!$util.isString(message.foreignId))
                            return "foreignId: string expected";
                    return null;
                };

                /**
                 * Creates an IdHolder message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof tools.simrail.backend.IdHolder
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {tools.simrail.backend.IdHolder} IdHolder
                 */
                IdHolder.fromObject = function fromObject(object) {
                    if (object instanceof $root.tools.simrail.backend.IdHolder)
                        return object;
                    let message = new $root.tools.simrail.backend.IdHolder();
                    if (object.dataId != null)
                        message.dataId = String(object.dataId);
                    if (object.serverId != null)
                        message.serverId = String(object.serverId);
                    if (object.foreignId != null)
                        message.foreignId = String(object.foreignId);
                    return message;
                };

                /**
                 * Creates a plain object from an IdHolder message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof tools.simrail.backend.IdHolder
                 * @static
                 * @param {tools.simrail.backend.IdHolder} message IdHolder
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                IdHolder.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.dataId = "";
                        object.serverId = "";
                        object.foreignId = "";
                    }
                    if (message.dataId != null && message.hasOwnProperty("dataId"))
                        object.dataId = message.dataId;
                    if (message.serverId != null && message.hasOwnProperty("serverId"))
                        object.serverId = message.serverId;
                    if (message.foreignId != null && message.hasOwnProperty("foreignId"))
                        object.foreignId = message.foreignId;
                    return object;
                };

                /**
                 * Converts this IdHolder to JSON.
                 * @function toJSON
                 * @memberof tools.simrail.backend.IdHolder
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                IdHolder.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for IdHolder
                 * @function getTypeUrl
                 * @memberof tools.simrail.backend.IdHolder
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                IdHolder.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/tools.simrail.backend.IdHolder";
                };

                return IdHolder;
            })();

            backend.JourneyData = (function() {

                /**
                 * Properties of a JourneyData.
                 * @memberof tools.simrail.backend
                 * @interface IJourneyData
                 * @property {number|undefined} [speed] JourneyData speed
                 * @property {tools.simrail.backend.IGeoPosition|undefined} [position] JourneyData position
                 * @property {tools.simrail.backend.IUser|null|undefined} [driver] JourneyData driver
                 * @property {tools.simrail.backend.ISignalInfo|null|undefined} [nextSignal] JourneyData nextSignal
                 * @property {string|null|undefined} [currentPointId] JourneyData currentPointId
                 */

                /**
                 * Constructs a new JourneyData.
                 * @memberof tools.simrail.backend
                 * @classdesc Represents a JourneyData.
                 * @implements IJourneyData
                 * @constructor
                 * @param {tools.simrail.backend.IJourneyData=} [properties] Properties to set
                 */
                function JourneyData(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * JourneyData speed.
                 * @member {number} speed
                 * @memberof tools.simrail.backend.JourneyData
                 * @instance
                 */
                JourneyData.prototype.speed = 0;

                /**
                 * JourneyData position.
                 * @member {tools.simrail.backend.GeoPosition} position
                 * @memberof tools.simrail.backend.JourneyData
                 * @instance
                 */
                JourneyData.prototype.position = null;

                /**
                 * JourneyData driver.
                 * @member {tools.simrail.backend.User|null} driver
                 * @memberof tools.simrail.backend.JourneyData
                 * @instance
                 */
                JourneyData.prototype.driver = null;

                /**
                 * JourneyData nextSignal.
                 * @member {tools.simrail.backend.SignalInfo|null} nextSignal
                 * @memberof tools.simrail.backend.JourneyData
                 * @instance
                 */
                JourneyData.prototype.nextSignal = null;

                /**
                 * JourneyData currentPointId.
                 * @member {string|null} currentPointId
                 * @memberof tools.simrail.backend.JourneyData
                 * @instance
                 */
                JourneyData.prototype.currentPointId = null;

                // OneOf field names bound to virtual getters and setters
                let $oneOfFields;

                // Virtual OneOf for proto3 optional field
                Object.defineProperty(JourneyData.prototype, "_driver", {
                    get: $util.oneOfGetter($oneOfFields = ["driver"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                // Virtual OneOf for proto3 optional field
                Object.defineProperty(JourneyData.prototype, "_nextSignal", {
                    get: $util.oneOfGetter($oneOfFields = ["nextSignal"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                // Virtual OneOf for proto3 optional field
                Object.defineProperty(JourneyData.prototype, "_currentPointId", {
                    get: $util.oneOfGetter($oneOfFields = ["currentPointId"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                /**
                 * Encodes the specified JourneyData message. Does not implicitly {@link tools.simrail.backend.JourneyData.verify|verify} messages.
                 * @function encode
                 * @memberof tools.simrail.backend.JourneyData
                 * @static
                 * @param {tools.simrail.backend.IJourneyData} message JourneyData message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                JourneyData.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.speed != null && Object.hasOwnProperty.call(message, "speed"))
                        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.speed);
                    if (message.position != null && Object.hasOwnProperty.call(message, "position"))
                        $root.tools.simrail.backend.GeoPosition.encode(message.position, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.driver != null && Object.hasOwnProperty.call(message, "driver"))
                        $root.tools.simrail.backend.User.encode(message.driver, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    if (message.nextSignal != null && Object.hasOwnProperty.call(message, "nextSignal"))
                        $root.tools.simrail.backend.SignalInfo.encode(message.nextSignal, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                    if (message.currentPointId != null && Object.hasOwnProperty.call(message, "currentPointId"))
                        writer.uint32(/* id 5, wireType 2 =*/42).string(message.currentPointId);
                    return writer;
                };

                /**
                 * Encodes the specified JourneyData message, length delimited. Does not implicitly {@link tools.simrail.backend.JourneyData.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof tools.simrail.backend.JourneyData
                 * @static
                 * @param {tools.simrail.backend.IJourneyData} message JourneyData message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                JourneyData.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a JourneyData message from the specified reader or buffer.
                 * @function decode
                 * @memberof tools.simrail.backend.JourneyData
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {tools.simrail.backend.JourneyData} JourneyData
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                JourneyData.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.tools.simrail.backend.JourneyData();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.speed = reader.uint32();
                                break;
                            }
                        case 2: {
                                message.position = $root.tools.simrail.backend.GeoPosition.decode(reader, reader.uint32());
                                break;
                            }
                        case 3: {
                                message.driver = $root.tools.simrail.backend.User.decode(reader, reader.uint32());
                                break;
                            }
                        case 4: {
                                message.nextSignal = $root.tools.simrail.backend.SignalInfo.decode(reader, reader.uint32());
                                break;
                            }
                        case 5: {
                                message.currentPointId = reader.string();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a JourneyData message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof tools.simrail.backend.JourneyData
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {tools.simrail.backend.JourneyData} JourneyData
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                JourneyData.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a JourneyData message.
                 * @function verify
                 * @memberof tools.simrail.backend.JourneyData
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                JourneyData.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    let properties = {};
                    if (message.speed != null && message.hasOwnProperty("speed"))
                        if (!$util.isInteger(message.speed))
                            return "speed: integer expected";
                    if (message.position != null && message.hasOwnProperty("position")) {
                        let error = $root.tools.simrail.backend.GeoPosition.verify(message.position);
                        if (error)
                            return "position." + error;
                    }
                    if (message.driver != null && message.hasOwnProperty("driver")) {
                        properties._driver = 1;
                        {
                            let error = $root.tools.simrail.backend.User.verify(message.driver);
                            if (error)
                                return "driver." + error;
                        }
                    }
                    if (message.nextSignal != null && message.hasOwnProperty("nextSignal")) {
                        properties._nextSignal = 1;
                        {
                            let error = $root.tools.simrail.backend.SignalInfo.verify(message.nextSignal);
                            if (error)
                                return "nextSignal." + error;
                        }
                    }
                    if (message.currentPointId != null && message.hasOwnProperty("currentPointId")) {
                        properties._currentPointId = 1;
                        if (!$util.isString(message.currentPointId))
                            return "currentPointId: string expected";
                    }
                    return null;
                };

                /**
                 * Creates a JourneyData message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof tools.simrail.backend.JourneyData
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {tools.simrail.backend.JourneyData} JourneyData
                 */
                JourneyData.fromObject = function fromObject(object) {
                    if (object instanceof $root.tools.simrail.backend.JourneyData)
                        return object;
                    let message = new $root.tools.simrail.backend.JourneyData();
                    if (object.speed != null)
                        message.speed = object.speed >>> 0;
                    if (object.position != null) {
                        if (typeof object.position !== "object")
                            throw TypeError(".tools.simrail.backend.JourneyData.position: object expected");
                        message.position = $root.tools.simrail.backend.GeoPosition.fromObject(object.position);
                    }
                    if (object.driver != null) {
                        if (typeof object.driver !== "object")
                            throw TypeError(".tools.simrail.backend.JourneyData.driver: object expected");
                        message.driver = $root.tools.simrail.backend.User.fromObject(object.driver);
                    }
                    if (object.nextSignal != null) {
                        if (typeof object.nextSignal !== "object")
                            throw TypeError(".tools.simrail.backend.JourneyData.nextSignal: object expected");
                        message.nextSignal = $root.tools.simrail.backend.SignalInfo.fromObject(object.nextSignal);
                    }
                    if (object.currentPointId != null)
                        message.currentPointId = String(object.currentPointId);
                    return message;
                };

                /**
                 * Creates a plain object from a JourneyData message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof tools.simrail.backend.JourneyData
                 * @static
                 * @param {tools.simrail.backend.JourneyData} message JourneyData
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                JourneyData.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.speed = 0;
                        object.position = null;
                    }
                    if (message.speed != null && message.hasOwnProperty("speed"))
                        object.speed = message.speed;
                    if (message.position != null && message.hasOwnProperty("position"))
                        object.position = $root.tools.simrail.backend.GeoPosition.toObject(message.position, options);
                    if (message.driver != null && message.hasOwnProperty("driver")) {
                        object.driver = $root.tools.simrail.backend.User.toObject(message.driver, options);
                        if (options.oneofs)
                            object._driver = "driver";
                    }
                    if (message.nextSignal != null && message.hasOwnProperty("nextSignal")) {
                        object.nextSignal = $root.tools.simrail.backend.SignalInfo.toObject(message.nextSignal, options);
                        if (options.oneofs)
                            object._nextSignal = "nextSignal";
                    }
                    if (message.currentPointId != null && message.hasOwnProperty("currentPointId")) {
                        object.currentPointId = message.currentPointId;
                        if (options.oneofs)
                            object._currentPointId = "currentPointId";
                    }
                    return object;
                };

                /**
                 * Converts this JourneyData to JSON.
                 * @function toJSON
                 * @memberof tools.simrail.backend.JourneyData
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                JourneyData.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for JourneyData
                 * @function getTypeUrl
                 * @memberof tools.simrail.backend.JourneyData
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                JourneyData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/tools.simrail.backend.JourneyData";
                };

                return JourneyData;
            })();

            backend.DispatchPostData = (function() {

                /**
                 * Properties of a DispatchPostData.
                 * @memberof tools.simrail.backend
                 * @interface IDispatchPostData
                 * @property {tools.simrail.backend.IUser|null|undefined} [dispatcher] DispatchPostData dispatcher
                 */

                /**
                 * Constructs a new DispatchPostData.
                 * @memberof tools.simrail.backend
                 * @classdesc Represents a DispatchPostData.
                 * @implements IDispatchPostData
                 * @constructor
                 * @param {tools.simrail.backend.IDispatchPostData=} [properties] Properties to set
                 */
                function DispatchPostData(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * DispatchPostData dispatcher.
                 * @member {tools.simrail.backend.User|null} dispatcher
                 * @memberof tools.simrail.backend.DispatchPostData
                 * @instance
                 */
                DispatchPostData.prototype.dispatcher = null;

                // OneOf field names bound to virtual getters and setters
                let $oneOfFields;

                // Virtual OneOf for proto3 optional field
                Object.defineProperty(DispatchPostData.prototype, "_dispatcher", {
                    get: $util.oneOfGetter($oneOfFields = ["dispatcher"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                /**
                 * Encodes the specified DispatchPostData message. Does not implicitly {@link tools.simrail.backend.DispatchPostData.verify|verify} messages.
                 * @function encode
                 * @memberof tools.simrail.backend.DispatchPostData
                 * @static
                 * @param {tools.simrail.backend.IDispatchPostData} message DispatchPostData message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DispatchPostData.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.dispatcher != null && Object.hasOwnProperty.call(message, "dispatcher"))
                        $root.tools.simrail.backend.User.encode(message.dispatcher, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified DispatchPostData message, length delimited. Does not implicitly {@link tools.simrail.backend.DispatchPostData.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof tools.simrail.backend.DispatchPostData
                 * @static
                 * @param {tools.simrail.backend.IDispatchPostData} message DispatchPostData message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DispatchPostData.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a DispatchPostData message from the specified reader or buffer.
                 * @function decode
                 * @memberof tools.simrail.backend.DispatchPostData
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {tools.simrail.backend.DispatchPostData} DispatchPostData
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DispatchPostData.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.tools.simrail.backend.DispatchPostData();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.dispatcher = $root.tools.simrail.backend.User.decode(reader, reader.uint32());
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a DispatchPostData message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof tools.simrail.backend.DispatchPostData
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {tools.simrail.backend.DispatchPostData} DispatchPostData
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DispatchPostData.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a DispatchPostData message.
                 * @function verify
                 * @memberof tools.simrail.backend.DispatchPostData
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                DispatchPostData.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    let properties = {};
                    if (message.dispatcher != null && message.hasOwnProperty("dispatcher")) {
                        properties._dispatcher = 1;
                        {
                            let error = $root.tools.simrail.backend.User.verify(message.dispatcher);
                            if (error)
                                return "dispatcher." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates a DispatchPostData message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof tools.simrail.backend.DispatchPostData
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {tools.simrail.backend.DispatchPostData} DispatchPostData
                 */
                DispatchPostData.fromObject = function fromObject(object) {
                    if (object instanceof $root.tools.simrail.backend.DispatchPostData)
                        return object;
                    let message = new $root.tools.simrail.backend.DispatchPostData();
                    if (object.dispatcher != null) {
                        if (typeof object.dispatcher !== "object")
                            throw TypeError(".tools.simrail.backend.DispatchPostData.dispatcher: object expected");
                        message.dispatcher = $root.tools.simrail.backend.User.fromObject(object.dispatcher);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a DispatchPostData message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof tools.simrail.backend.DispatchPostData
                 * @static
                 * @param {tools.simrail.backend.DispatchPostData} message DispatchPostData
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                DispatchPostData.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (message.dispatcher != null && message.hasOwnProperty("dispatcher")) {
                        object.dispatcher = $root.tools.simrail.backend.User.toObject(message.dispatcher, options);
                        if (options.oneofs)
                            object._dispatcher = "dispatcher";
                    }
                    return object;
                };

                /**
                 * Converts this DispatchPostData to JSON.
                 * @function toJSON
                 * @memberof tools.simrail.backend.DispatchPostData
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                DispatchPostData.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for DispatchPostData
                 * @function getTypeUrl
                 * @memberof tools.simrail.backend.DispatchPostData
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                DispatchPostData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/tools.simrail.backend.DispatchPostData";
                };

                return DispatchPostData;
            })();

            backend.ServerData = (function() {

                /**
                 * Properties of a ServerData.
                 * @memberof tools.simrail.backend
                 * @interface IServerData
                 * @property {boolean|undefined} [online] ServerData online
                 * @property {string|undefined} [scenery] ServerData scenery
                 * @property {Long|undefined} [utcOffsetSeconds] ServerData utcOffsetSeconds
                 * @property {string|null|undefined} [spokenLanguage] ServerData spokenLanguage
                 * @property {Array.<string>|undefined} [tags] ServerData tags
                 */

                /**
                 * Constructs a new ServerData.
                 * @memberof tools.simrail.backend
                 * @classdesc Represents a ServerData.
                 * @implements IServerData
                 * @constructor
                 * @param {tools.simrail.backend.IServerData=} [properties] Properties to set
                 */
                function ServerData(properties) {
                    this.tags = [];
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ServerData online.
                 * @member {boolean} online
                 * @memberof tools.simrail.backend.ServerData
                 * @instance
                 */
                ServerData.prototype.online = false;

                /**
                 * ServerData scenery.
                 * @member {string} scenery
                 * @memberof tools.simrail.backend.ServerData
                 * @instance
                 */
                ServerData.prototype.scenery = "";

                /**
                 * ServerData utcOffsetSeconds.
                 * @member {Long} utcOffsetSeconds
                 * @memberof tools.simrail.backend.ServerData
                 * @instance
                 */
                ServerData.prototype.utcOffsetSeconds = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                /**
                 * ServerData spokenLanguage.
                 * @member {string|null} spokenLanguage
                 * @memberof tools.simrail.backend.ServerData
                 * @instance
                 */
                ServerData.prototype.spokenLanguage = null;

                /**
                 * ServerData tags.
                 * @member {Array.<string>} tags
                 * @memberof tools.simrail.backend.ServerData
                 * @instance
                 */
                ServerData.prototype.tags = $util.emptyArray;

                // OneOf field names bound to virtual getters and setters
                let $oneOfFields;

                // Virtual OneOf for proto3 optional field
                Object.defineProperty(ServerData.prototype, "_spokenLanguage", {
                    get: $util.oneOfGetter($oneOfFields = ["spokenLanguage"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                /**
                 * Encodes the specified ServerData message. Does not implicitly {@link tools.simrail.backend.ServerData.verify|verify} messages.
                 * @function encode
                 * @memberof tools.simrail.backend.ServerData
                 * @static
                 * @param {tools.simrail.backend.IServerData} message ServerData message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ServerData.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.online != null && Object.hasOwnProperty.call(message, "online"))
                        writer.uint32(/* id 1, wireType 0 =*/8).bool(message.online);
                    if (message.scenery != null && Object.hasOwnProperty.call(message, "scenery"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.scenery);
                    if (message.utcOffsetSeconds != null && Object.hasOwnProperty.call(message, "utcOffsetSeconds"))
                        writer.uint32(/* id 3, wireType 0 =*/24).sint64(message.utcOffsetSeconds);
                    if (message.spokenLanguage != null && Object.hasOwnProperty.call(message, "spokenLanguage"))
                        writer.uint32(/* id 4, wireType 2 =*/34).string(message.spokenLanguage);
                    if (message.tags != null && message.tags.length)
                        for (let i = 0; i < message.tags.length; ++i)
                            writer.uint32(/* id 5, wireType 2 =*/42).string(message.tags[i]);
                    return writer;
                };

                /**
                 * Encodes the specified ServerData message, length delimited. Does not implicitly {@link tools.simrail.backend.ServerData.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof tools.simrail.backend.ServerData
                 * @static
                 * @param {tools.simrail.backend.IServerData} message ServerData message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ServerData.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a ServerData message from the specified reader or buffer.
                 * @function decode
                 * @memberof tools.simrail.backend.ServerData
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {tools.simrail.backend.ServerData} ServerData
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ServerData.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.tools.simrail.backend.ServerData();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.online = reader.bool();
                                break;
                            }
                        case 2: {
                                message.scenery = reader.string();
                                break;
                            }
                        case 3: {
                                message.utcOffsetSeconds = reader.sint64();
                                break;
                            }
                        case 4: {
                                message.spokenLanguage = reader.string();
                                break;
                            }
                        case 5: {
                                if (!(message.tags && message.tags.length))
                                    message.tags = [];
                                message.tags.push(reader.string());
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a ServerData message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof tools.simrail.backend.ServerData
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {tools.simrail.backend.ServerData} ServerData
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ServerData.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a ServerData message.
                 * @function verify
                 * @memberof tools.simrail.backend.ServerData
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ServerData.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    let properties = {};
                    if (message.online != null && message.hasOwnProperty("online"))
                        if (typeof message.online !== "boolean")
                            return "online: boolean expected";
                    if (message.scenery != null && message.hasOwnProperty("scenery"))
                        if (!$util.isString(message.scenery))
                            return "scenery: string expected";
                    if (message.utcOffsetSeconds != null && message.hasOwnProperty("utcOffsetSeconds"))
                        if (!$util.isInteger(message.utcOffsetSeconds) && !(message.utcOffsetSeconds && $util.isInteger(message.utcOffsetSeconds.low) && $util.isInteger(message.utcOffsetSeconds.high)))
                            return "utcOffsetSeconds: integer|Long expected";
                    if (message.spokenLanguage != null && message.hasOwnProperty("spokenLanguage")) {
                        properties._spokenLanguage = 1;
                        if (!$util.isString(message.spokenLanguage))
                            return "spokenLanguage: string expected";
                    }
                    if (message.tags != null && message.hasOwnProperty("tags")) {
                        if (!Array.isArray(message.tags))
                            return "tags: array expected";
                        for (let i = 0; i < message.tags.length; ++i)
                            if (!$util.isString(message.tags[i]))
                                return "tags: string[] expected";
                    }
                    return null;
                };

                /**
                 * Creates a ServerData message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof tools.simrail.backend.ServerData
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {tools.simrail.backend.ServerData} ServerData
                 */
                ServerData.fromObject = function fromObject(object) {
                    if (object instanceof $root.tools.simrail.backend.ServerData)
                        return object;
                    let message = new $root.tools.simrail.backend.ServerData();
                    if (object.online != null)
                        message.online = Boolean(object.online);
                    if (object.scenery != null)
                        message.scenery = String(object.scenery);
                    if (object.utcOffsetSeconds != null)
                        if ($util.Long)
                            (message.utcOffsetSeconds = $util.Long.fromValue(object.utcOffsetSeconds)).unsigned = false;
                        else if (typeof object.utcOffsetSeconds === "string")
                            message.utcOffsetSeconds = parseInt(object.utcOffsetSeconds, 10);
                        else if (typeof object.utcOffsetSeconds === "number")
                            message.utcOffsetSeconds = object.utcOffsetSeconds;
                        else if (typeof object.utcOffsetSeconds === "object")
                            message.utcOffsetSeconds = new $util.LongBits(object.utcOffsetSeconds.low >>> 0, object.utcOffsetSeconds.high >>> 0).toNumber();
                    if (object.spokenLanguage != null)
                        message.spokenLanguage = String(object.spokenLanguage);
                    if (object.tags) {
                        if (!Array.isArray(object.tags))
                            throw TypeError(".tools.simrail.backend.ServerData.tags: array expected");
                        message.tags = [];
                        for (let i = 0; i < object.tags.length; ++i)
                            message.tags[i] = String(object.tags[i]);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a ServerData message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof tools.simrail.backend.ServerData
                 * @static
                 * @param {tools.simrail.backend.ServerData} message ServerData
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ServerData.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.arrays || options.defaults)
                        object.tags = [];
                    if (options.defaults) {
                        object.online = false;
                        object.scenery = "";
                        if ($util.Long) {
                            let long = new $util.Long(0, 0, false);
                            object.utcOffsetSeconds = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.utcOffsetSeconds = options.longs === String ? "0" : 0;
                    }
                    if (message.online != null && message.hasOwnProperty("online"))
                        object.online = message.online;
                    if (message.scenery != null && message.hasOwnProperty("scenery"))
                        object.scenery = message.scenery;
                    if (message.utcOffsetSeconds != null && message.hasOwnProperty("utcOffsetSeconds"))
                        if (typeof message.utcOffsetSeconds === "number")
                            object.utcOffsetSeconds = options.longs === String ? String(message.utcOffsetSeconds) : message.utcOffsetSeconds;
                        else
                            object.utcOffsetSeconds = options.longs === String ? $util.Long.prototype.toString.call(message.utcOffsetSeconds) : options.longs === Number ? new $util.LongBits(message.utcOffsetSeconds.low >>> 0, message.utcOffsetSeconds.high >>> 0).toNumber() : message.utcOffsetSeconds;
                    if (message.spokenLanguage != null && message.hasOwnProperty("spokenLanguage")) {
                        object.spokenLanguage = message.spokenLanguage;
                        if (options.oneofs)
                            object._spokenLanguage = "spokenLanguage";
                    }
                    if (message.tags && message.tags.length) {
                        object.tags = [];
                        for (let j = 0; j < message.tags.length; ++j)
                            object.tags[j] = message.tags[j];
                    }
                    return object;
                };

                /**
                 * Converts this ServerData to JSON.
                 * @function toJSON
                 * @memberof tools.simrail.backend.ServerData
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ServerData.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for ServerData
                 * @function getTypeUrl
                 * @memberof tools.simrail.backend.ServerData
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                ServerData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/tools.simrail.backend.ServerData";
                };

                return ServerData;
            })();

            backend.BaseFrameData = (function() {

                /**
                 * Properties of a BaseFrameData.
                 * @memberof tools.simrail.backend
                 * @interface IBaseFrameData
                 * @property {Long|undefined} [timestamp] BaseFrameData timestamp
                 */

                /**
                 * Constructs a new BaseFrameData.
                 * @memberof tools.simrail.backend
                 * @classdesc Represents a BaseFrameData.
                 * @implements IBaseFrameData
                 * @constructor
                 * @param {tools.simrail.backend.IBaseFrameData=} [properties] Properties to set
                 */
                function BaseFrameData(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * BaseFrameData timestamp.
                 * @member {Long} timestamp
                 * @memberof tools.simrail.backend.BaseFrameData
                 * @instance
                 */
                BaseFrameData.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                /**
                 * Encodes the specified BaseFrameData message. Does not implicitly {@link tools.simrail.backend.BaseFrameData.verify|verify} messages.
                 * @function encode
                 * @memberof tools.simrail.backend.BaseFrameData
                 * @static
                 * @param {tools.simrail.backend.IBaseFrameData} message BaseFrameData message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                BaseFrameData.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                        writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.timestamp);
                    return writer;
                };

                /**
                 * Encodes the specified BaseFrameData message, length delimited. Does not implicitly {@link tools.simrail.backend.BaseFrameData.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof tools.simrail.backend.BaseFrameData
                 * @static
                 * @param {tools.simrail.backend.IBaseFrameData} message BaseFrameData message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                BaseFrameData.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a BaseFrameData message from the specified reader or buffer.
                 * @function decode
                 * @memberof tools.simrail.backend.BaseFrameData
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {tools.simrail.backend.BaseFrameData} BaseFrameData
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                BaseFrameData.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.tools.simrail.backend.BaseFrameData();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.timestamp = reader.uint64();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a BaseFrameData message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof tools.simrail.backend.BaseFrameData
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {tools.simrail.backend.BaseFrameData} BaseFrameData
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                BaseFrameData.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a BaseFrameData message.
                 * @function verify
                 * @memberof tools.simrail.backend.BaseFrameData
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                BaseFrameData.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                        if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                            return "timestamp: integer|Long expected";
                    return null;
                };

                /**
                 * Creates a BaseFrameData message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof tools.simrail.backend.BaseFrameData
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {tools.simrail.backend.BaseFrameData} BaseFrameData
                 */
                BaseFrameData.fromObject = function fromObject(object) {
                    if (object instanceof $root.tools.simrail.backend.BaseFrameData)
                        return object;
                    let message = new $root.tools.simrail.backend.BaseFrameData();
                    if (object.timestamp != null)
                        if ($util.Long)
                            (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = true;
                        else if (typeof object.timestamp === "string")
                            message.timestamp = parseInt(object.timestamp, 10);
                        else if (typeof object.timestamp === "number")
                            message.timestamp = object.timestamp;
                        else if (typeof object.timestamp === "object")
                            message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber(true);
                    return message;
                };

                /**
                 * Creates a plain object from a BaseFrameData message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof tools.simrail.backend.BaseFrameData
                 * @static
                 * @param {tools.simrail.backend.BaseFrameData} message BaseFrameData
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                BaseFrameData.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults)
                        if ($util.Long) {
                            let long = new $util.Long(0, 0, true);
                            object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.timestamp = options.longs === String ? "0" : 0;
                    if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                        if (typeof message.timestamp === "number")
                            object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
                        else
                            object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber(true) : message.timestamp;
                    return object;
                };

                /**
                 * Converts this BaseFrameData to JSON.
                 * @function toJSON
                 * @memberof tools.simrail.backend.BaseFrameData
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                BaseFrameData.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for BaseFrameData
                 * @function getTypeUrl
                 * @memberof tools.simrail.backend.BaseFrameData
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                BaseFrameData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/tools.simrail.backend.BaseFrameData";
                };

                return BaseFrameData;
            })();

            backend.JourneyUpdateFrame = (function() {

                /**
                 * Properties of a JourneyUpdateFrame.
                 * @memberof tools.simrail.backend
                 * @interface IJourneyUpdateFrame
                 * @property {tools.simrail.backend.IBaseFrameData|undefined} [baseData] JourneyUpdateFrame baseData
                 * @property {tools.simrail.backend.IIdHolder|undefined} [ids] JourneyUpdateFrame ids
                 * @property {tools.simrail.backend.IJourneyData|undefined} [journeyData] JourneyUpdateFrame journeyData
                 */

                /**
                 * Constructs a new JourneyUpdateFrame.
                 * @memberof tools.simrail.backend
                 * @classdesc Represents a JourneyUpdateFrame.
                 * @implements IJourneyUpdateFrame
                 * @constructor
                 * @param {tools.simrail.backend.IJourneyUpdateFrame=} [properties] Properties to set
                 */
                function JourneyUpdateFrame(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * JourneyUpdateFrame baseData.
                 * @member {tools.simrail.backend.BaseFrameData} baseData
                 * @memberof tools.simrail.backend.JourneyUpdateFrame
                 * @instance
                 */
                JourneyUpdateFrame.prototype.baseData = null;

                /**
                 * JourneyUpdateFrame ids.
                 * @member {tools.simrail.backend.IdHolder} ids
                 * @memberof tools.simrail.backend.JourneyUpdateFrame
                 * @instance
                 */
                JourneyUpdateFrame.prototype.ids = null;

                /**
                 * JourneyUpdateFrame journeyData.
                 * @member {tools.simrail.backend.JourneyData} journeyData
                 * @memberof tools.simrail.backend.JourneyUpdateFrame
                 * @instance
                 */
                JourneyUpdateFrame.prototype.journeyData = null;

                /**
                 * Encodes the specified JourneyUpdateFrame message. Does not implicitly {@link tools.simrail.backend.JourneyUpdateFrame.verify|verify} messages.
                 * @function encode
                 * @memberof tools.simrail.backend.JourneyUpdateFrame
                 * @static
                 * @param {tools.simrail.backend.IJourneyUpdateFrame} message JourneyUpdateFrame message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                JourneyUpdateFrame.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.baseData != null && Object.hasOwnProperty.call(message, "baseData"))
                        $root.tools.simrail.backend.BaseFrameData.encode(message.baseData, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.ids != null && Object.hasOwnProperty.call(message, "ids"))
                        $root.tools.simrail.backend.IdHolder.encode(message.ids, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.journeyData != null && Object.hasOwnProperty.call(message, "journeyData"))
                        $root.tools.simrail.backend.JourneyData.encode(message.journeyData, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified JourneyUpdateFrame message, length delimited. Does not implicitly {@link tools.simrail.backend.JourneyUpdateFrame.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof tools.simrail.backend.JourneyUpdateFrame
                 * @static
                 * @param {tools.simrail.backend.IJourneyUpdateFrame} message JourneyUpdateFrame message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                JourneyUpdateFrame.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a JourneyUpdateFrame message from the specified reader or buffer.
                 * @function decode
                 * @memberof tools.simrail.backend.JourneyUpdateFrame
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {tools.simrail.backend.JourneyUpdateFrame} JourneyUpdateFrame
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                JourneyUpdateFrame.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.tools.simrail.backend.JourneyUpdateFrame();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.baseData = $root.tools.simrail.backend.BaseFrameData.decode(reader, reader.uint32());
                                break;
                            }
                        case 2: {
                                message.ids = $root.tools.simrail.backend.IdHolder.decode(reader, reader.uint32());
                                break;
                            }
                        case 3: {
                                message.journeyData = $root.tools.simrail.backend.JourneyData.decode(reader, reader.uint32());
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a JourneyUpdateFrame message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof tools.simrail.backend.JourneyUpdateFrame
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {tools.simrail.backend.JourneyUpdateFrame} JourneyUpdateFrame
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                JourneyUpdateFrame.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a JourneyUpdateFrame message.
                 * @function verify
                 * @memberof tools.simrail.backend.JourneyUpdateFrame
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                JourneyUpdateFrame.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.baseData != null && message.hasOwnProperty("baseData")) {
                        let error = $root.tools.simrail.backend.BaseFrameData.verify(message.baseData);
                        if (error)
                            return "baseData." + error;
                    }
                    if (message.ids != null && message.hasOwnProperty("ids")) {
                        let error = $root.tools.simrail.backend.IdHolder.verify(message.ids);
                        if (error)
                            return "ids." + error;
                    }
                    if (message.journeyData != null && message.hasOwnProperty("journeyData")) {
                        let error = $root.tools.simrail.backend.JourneyData.verify(message.journeyData);
                        if (error)
                            return "journeyData." + error;
                    }
                    return null;
                };

                /**
                 * Creates a JourneyUpdateFrame message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof tools.simrail.backend.JourneyUpdateFrame
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {tools.simrail.backend.JourneyUpdateFrame} JourneyUpdateFrame
                 */
                JourneyUpdateFrame.fromObject = function fromObject(object) {
                    if (object instanceof $root.tools.simrail.backend.JourneyUpdateFrame)
                        return object;
                    let message = new $root.tools.simrail.backend.JourneyUpdateFrame();
                    if (object.baseData != null) {
                        if (typeof object.baseData !== "object")
                            throw TypeError(".tools.simrail.backend.JourneyUpdateFrame.baseData: object expected");
                        message.baseData = $root.tools.simrail.backend.BaseFrameData.fromObject(object.baseData);
                    }
                    if (object.ids != null) {
                        if (typeof object.ids !== "object")
                            throw TypeError(".tools.simrail.backend.JourneyUpdateFrame.ids: object expected");
                        message.ids = $root.tools.simrail.backend.IdHolder.fromObject(object.ids);
                    }
                    if (object.journeyData != null) {
                        if (typeof object.journeyData !== "object")
                            throw TypeError(".tools.simrail.backend.JourneyUpdateFrame.journeyData: object expected");
                        message.journeyData = $root.tools.simrail.backend.JourneyData.fromObject(object.journeyData);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a JourneyUpdateFrame message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof tools.simrail.backend.JourneyUpdateFrame
                 * @static
                 * @param {tools.simrail.backend.JourneyUpdateFrame} message JourneyUpdateFrame
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                JourneyUpdateFrame.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.baseData = null;
                        object.ids = null;
                        object.journeyData = null;
                    }
                    if (message.baseData != null && message.hasOwnProperty("baseData"))
                        object.baseData = $root.tools.simrail.backend.BaseFrameData.toObject(message.baseData, options);
                    if (message.ids != null && message.hasOwnProperty("ids"))
                        object.ids = $root.tools.simrail.backend.IdHolder.toObject(message.ids, options);
                    if (message.journeyData != null && message.hasOwnProperty("journeyData"))
                        object.journeyData = $root.tools.simrail.backend.JourneyData.toObject(message.journeyData, options);
                    return object;
                };

                /**
                 * Converts this JourneyUpdateFrame to JSON.
                 * @function toJSON
                 * @memberof tools.simrail.backend.JourneyUpdateFrame
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                JourneyUpdateFrame.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for JourneyUpdateFrame
                 * @function getTypeUrl
                 * @memberof tools.simrail.backend.JourneyUpdateFrame
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                JourneyUpdateFrame.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/tools.simrail.backend.JourneyUpdateFrame";
                };

                return JourneyUpdateFrame;
            })();

            backend.JourneyRemoveFrame = (function() {

                /**
                 * Properties of a JourneyRemoveFrame.
                 * @memberof tools.simrail.backend
                 * @interface IJourneyRemoveFrame
                 * @property {tools.simrail.backend.IBaseFrameData|undefined} [baseData] JourneyRemoveFrame baseData
                 * @property {string|undefined} [journeyId] JourneyRemoveFrame journeyId
                 */

                /**
                 * Constructs a new JourneyRemoveFrame.
                 * @memberof tools.simrail.backend
                 * @classdesc Represents a JourneyRemoveFrame.
                 * @implements IJourneyRemoveFrame
                 * @constructor
                 * @param {tools.simrail.backend.IJourneyRemoveFrame=} [properties] Properties to set
                 */
                function JourneyRemoveFrame(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * JourneyRemoveFrame baseData.
                 * @member {tools.simrail.backend.BaseFrameData} baseData
                 * @memberof tools.simrail.backend.JourneyRemoveFrame
                 * @instance
                 */
                JourneyRemoveFrame.prototype.baseData = null;

                /**
                 * JourneyRemoveFrame journeyId.
                 * @member {string} journeyId
                 * @memberof tools.simrail.backend.JourneyRemoveFrame
                 * @instance
                 */
                JourneyRemoveFrame.prototype.journeyId = "";

                /**
                 * Encodes the specified JourneyRemoveFrame message. Does not implicitly {@link tools.simrail.backend.JourneyRemoveFrame.verify|verify} messages.
                 * @function encode
                 * @memberof tools.simrail.backend.JourneyRemoveFrame
                 * @static
                 * @param {tools.simrail.backend.IJourneyRemoveFrame} message JourneyRemoveFrame message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                JourneyRemoveFrame.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.baseData != null && Object.hasOwnProperty.call(message, "baseData"))
                        $root.tools.simrail.backend.BaseFrameData.encode(message.baseData, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.journeyId != null && Object.hasOwnProperty.call(message, "journeyId"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.journeyId);
                    return writer;
                };

                /**
                 * Encodes the specified JourneyRemoveFrame message, length delimited. Does not implicitly {@link tools.simrail.backend.JourneyRemoveFrame.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof tools.simrail.backend.JourneyRemoveFrame
                 * @static
                 * @param {tools.simrail.backend.IJourneyRemoveFrame} message JourneyRemoveFrame message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                JourneyRemoveFrame.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a JourneyRemoveFrame message from the specified reader or buffer.
                 * @function decode
                 * @memberof tools.simrail.backend.JourneyRemoveFrame
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {tools.simrail.backend.JourneyRemoveFrame} JourneyRemoveFrame
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                JourneyRemoveFrame.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.tools.simrail.backend.JourneyRemoveFrame();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.baseData = $root.tools.simrail.backend.BaseFrameData.decode(reader, reader.uint32());
                                break;
                            }
                        case 2: {
                                message.journeyId = reader.string();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a JourneyRemoveFrame message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof tools.simrail.backend.JourneyRemoveFrame
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {tools.simrail.backend.JourneyRemoveFrame} JourneyRemoveFrame
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                JourneyRemoveFrame.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a JourneyRemoveFrame message.
                 * @function verify
                 * @memberof tools.simrail.backend.JourneyRemoveFrame
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                JourneyRemoveFrame.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.baseData != null && message.hasOwnProperty("baseData")) {
                        let error = $root.tools.simrail.backend.BaseFrameData.verify(message.baseData);
                        if (error)
                            return "baseData." + error;
                    }
                    if (message.journeyId != null && message.hasOwnProperty("journeyId"))
                        if (!$util.isString(message.journeyId))
                            return "journeyId: string expected";
                    return null;
                };

                /**
                 * Creates a JourneyRemoveFrame message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof tools.simrail.backend.JourneyRemoveFrame
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {tools.simrail.backend.JourneyRemoveFrame} JourneyRemoveFrame
                 */
                JourneyRemoveFrame.fromObject = function fromObject(object) {
                    if (object instanceof $root.tools.simrail.backend.JourneyRemoveFrame)
                        return object;
                    let message = new $root.tools.simrail.backend.JourneyRemoveFrame();
                    if (object.baseData != null) {
                        if (typeof object.baseData !== "object")
                            throw TypeError(".tools.simrail.backend.JourneyRemoveFrame.baseData: object expected");
                        message.baseData = $root.tools.simrail.backend.BaseFrameData.fromObject(object.baseData);
                    }
                    if (object.journeyId != null)
                        message.journeyId = String(object.journeyId);
                    return message;
                };

                /**
                 * Creates a plain object from a JourneyRemoveFrame message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof tools.simrail.backend.JourneyRemoveFrame
                 * @static
                 * @param {tools.simrail.backend.JourneyRemoveFrame} message JourneyRemoveFrame
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                JourneyRemoveFrame.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.baseData = null;
                        object.journeyId = "";
                    }
                    if (message.baseData != null && message.hasOwnProperty("baseData"))
                        object.baseData = $root.tools.simrail.backend.BaseFrameData.toObject(message.baseData, options);
                    if (message.journeyId != null && message.hasOwnProperty("journeyId"))
                        object.journeyId = message.journeyId;
                    return object;
                };

                /**
                 * Converts this JourneyRemoveFrame to JSON.
                 * @function toJSON
                 * @memberof tools.simrail.backend.JourneyRemoveFrame
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                JourneyRemoveFrame.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for JourneyRemoveFrame
                 * @function getTypeUrl
                 * @memberof tools.simrail.backend.JourneyRemoveFrame
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                JourneyRemoveFrame.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/tools.simrail.backend.JourneyRemoveFrame";
                };

                return JourneyRemoveFrame;
            })();

            backend.DispatchPostUpdateFrame = (function() {

                /**
                 * Properties of a DispatchPostUpdateFrame.
                 * @memberof tools.simrail.backend
                 * @interface IDispatchPostUpdateFrame
                 * @property {tools.simrail.backend.IBaseFrameData|undefined} [baseData] DispatchPostUpdateFrame baseData
                 * @property {tools.simrail.backend.IIdHolder|undefined} [ids] DispatchPostUpdateFrame ids
                 * @property {tools.simrail.backend.IDispatchPostData|undefined} [dispatchPostData] DispatchPostUpdateFrame dispatchPostData
                 */

                /**
                 * Constructs a new DispatchPostUpdateFrame.
                 * @memberof tools.simrail.backend
                 * @classdesc Represents a DispatchPostUpdateFrame.
                 * @implements IDispatchPostUpdateFrame
                 * @constructor
                 * @param {tools.simrail.backend.IDispatchPostUpdateFrame=} [properties] Properties to set
                 */
                function DispatchPostUpdateFrame(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * DispatchPostUpdateFrame baseData.
                 * @member {tools.simrail.backend.BaseFrameData} baseData
                 * @memberof tools.simrail.backend.DispatchPostUpdateFrame
                 * @instance
                 */
                DispatchPostUpdateFrame.prototype.baseData = null;

                /**
                 * DispatchPostUpdateFrame ids.
                 * @member {tools.simrail.backend.IdHolder} ids
                 * @memberof tools.simrail.backend.DispatchPostUpdateFrame
                 * @instance
                 */
                DispatchPostUpdateFrame.prototype.ids = null;

                /**
                 * DispatchPostUpdateFrame dispatchPostData.
                 * @member {tools.simrail.backend.DispatchPostData} dispatchPostData
                 * @memberof tools.simrail.backend.DispatchPostUpdateFrame
                 * @instance
                 */
                DispatchPostUpdateFrame.prototype.dispatchPostData = null;

                /**
                 * Encodes the specified DispatchPostUpdateFrame message. Does not implicitly {@link tools.simrail.backend.DispatchPostUpdateFrame.verify|verify} messages.
                 * @function encode
                 * @memberof tools.simrail.backend.DispatchPostUpdateFrame
                 * @static
                 * @param {tools.simrail.backend.IDispatchPostUpdateFrame} message DispatchPostUpdateFrame message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DispatchPostUpdateFrame.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.baseData != null && Object.hasOwnProperty.call(message, "baseData"))
                        $root.tools.simrail.backend.BaseFrameData.encode(message.baseData, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.ids != null && Object.hasOwnProperty.call(message, "ids"))
                        $root.tools.simrail.backend.IdHolder.encode(message.ids, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.dispatchPostData != null && Object.hasOwnProperty.call(message, "dispatchPostData"))
                        $root.tools.simrail.backend.DispatchPostData.encode(message.dispatchPostData, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified DispatchPostUpdateFrame message, length delimited. Does not implicitly {@link tools.simrail.backend.DispatchPostUpdateFrame.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof tools.simrail.backend.DispatchPostUpdateFrame
                 * @static
                 * @param {tools.simrail.backend.IDispatchPostUpdateFrame} message DispatchPostUpdateFrame message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DispatchPostUpdateFrame.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a DispatchPostUpdateFrame message from the specified reader or buffer.
                 * @function decode
                 * @memberof tools.simrail.backend.DispatchPostUpdateFrame
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {tools.simrail.backend.DispatchPostUpdateFrame} DispatchPostUpdateFrame
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DispatchPostUpdateFrame.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.tools.simrail.backend.DispatchPostUpdateFrame();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.baseData = $root.tools.simrail.backend.BaseFrameData.decode(reader, reader.uint32());
                                break;
                            }
                        case 2: {
                                message.ids = $root.tools.simrail.backend.IdHolder.decode(reader, reader.uint32());
                                break;
                            }
                        case 3: {
                                message.dispatchPostData = $root.tools.simrail.backend.DispatchPostData.decode(reader, reader.uint32());
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a DispatchPostUpdateFrame message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof tools.simrail.backend.DispatchPostUpdateFrame
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {tools.simrail.backend.DispatchPostUpdateFrame} DispatchPostUpdateFrame
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DispatchPostUpdateFrame.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a DispatchPostUpdateFrame message.
                 * @function verify
                 * @memberof tools.simrail.backend.DispatchPostUpdateFrame
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                DispatchPostUpdateFrame.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.baseData != null && message.hasOwnProperty("baseData")) {
                        let error = $root.tools.simrail.backend.BaseFrameData.verify(message.baseData);
                        if (error)
                            return "baseData." + error;
                    }
                    if (message.ids != null && message.hasOwnProperty("ids")) {
                        let error = $root.tools.simrail.backend.IdHolder.verify(message.ids);
                        if (error)
                            return "ids." + error;
                    }
                    if (message.dispatchPostData != null && message.hasOwnProperty("dispatchPostData")) {
                        let error = $root.tools.simrail.backend.DispatchPostData.verify(message.dispatchPostData);
                        if (error)
                            return "dispatchPostData." + error;
                    }
                    return null;
                };

                /**
                 * Creates a DispatchPostUpdateFrame message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof tools.simrail.backend.DispatchPostUpdateFrame
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {tools.simrail.backend.DispatchPostUpdateFrame} DispatchPostUpdateFrame
                 */
                DispatchPostUpdateFrame.fromObject = function fromObject(object) {
                    if (object instanceof $root.tools.simrail.backend.DispatchPostUpdateFrame)
                        return object;
                    let message = new $root.tools.simrail.backend.DispatchPostUpdateFrame();
                    if (object.baseData != null) {
                        if (typeof object.baseData !== "object")
                            throw TypeError(".tools.simrail.backend.DispatchPostUpdateFrame.baseData: object expected");
                        message.baseData = $root.tools.simrail.backend.BaseFrameData.fromObject(object.baseData);
                    }
                    if (object.ids != null) {
                        if (typeof object.ids !== "object")
                            throw TypeError(".tools.simrail.backend.DispatchPostUpdateFrame.ids: object expected");
                        message.ids = $root.tools.simrail.backend.IdHolder.fromObject(object.ids);
                    }
                    if (object.dispatchPostData != null) {
                        if (typeof object.dispatchPostData !== "object")
                            throw TypeError(".tools.simrail.backend.DispatchPostUpdateFrame.dispatchPostData: object expected");
                        message.dispatchPostData = $root.tools.simrail.backend.DispatchPostData.fromObject(object.dispatchPostData);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a DispatchPostUpdateFrame message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof tools.simrail.backend.DispatchPostUpdateFrame
                 * @static
                 * @param {tools.simrail.backend.DispatchPostUpdateFrame} message DispatchPostUpdateFrame
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                DispatchPostUpdateFrame.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.baseData = null;
                        object.ids = null;
                        object.dispatchPostData = null;
                    }
                    if (message.baseData != null && message.hasOwnProperty("baseData"))
                        object.baseData = $root.tools.simrail.backend.BaseFrameData.toObject(message.baseData, options);
                    if (message.ids != null && message.hasOwnProperty("ids"))
                        object.ids = $root.tools.simrail.backend.IdHolder.toObject(message.ids, options);
                    if (message.dispatchPostData != null && message.hasOwnProperty("dispatchPostData"))
                        object.dispatchPostData = $root.tools.simrail.backend.DispatchPostData.toObject(message.dispatchPostData, options);
                    return object;
                };

                /**
                 * Converts this DispatchPostUpdateFrame to JSON.
                 * @function toJSON
                 * @memberof tools.simrail.backend.DispatchPostUpdateFrame
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                DispatchPostUpdateFrame.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for DispatchPostUpdateFrame
                 * @function getTypeUrl
                 * @memberof tools.simrail.backend.DispatchPostUpdateFrame
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                DispatchPostUpdateFrame.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/tools.simrail.backend.DispatchPostUpdateFrame";
                };

                return DispatchPostUpdateFrame;
            })();

            backend.DispatchPostRemoveFrame = (function() {

                /**
                 * Properties of a DispatchPostRemoveFrame.
                 * @memberof tools.simrail.backend
                 * @interface IDispatchPostRemoveFrame
                 * @property {tools.simrail.backend.IBaseFrameData|undefined} [baseData] DispatchPostRemoveFrame baseData
                 * @property {string|undefined} [postId] DispatchPostRemoveFrame postId
                 */

                /**
                 * Constructs a new DispatchPostRemoveFrame.
                 * @memberof tools.simrail.backend
                 * @classdesc Represents a DispatchPostRemoveFrame.
                 * @implements IDispatchPostRemoveFrame
                 * @constructor
                 * @param {tools.simrail.backend.IDispatchPostRemoveFrame=} [properties] Properties to set
                 */
                function DispatchPostRemoveFrame(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * DispatchPostRemoveFrame baseData.
                 * @member {tools.simrail.backend.BaseFrameData} baseData
                 * @memberof tools.simrail.backend.DispatchPostRemoveFrame
                 * @instance
                 */
                DispatchPostRemoveFrame.prototype.baseData = null;

                /**
                 * DispatchPostRemoveFrame postId.
                 * @member {string} postId
                 * @memberof tools.simrail.backend.DispatchPostRemoveFrame
                 * @instance
                 */
                DispatchPostRemoveFrame.prototype.postId = "";

                /**
                 * Encodes the specified DispatchPostRemoveFrame message. Does not implicitly {@link tools.simrail.backend.DispatchPostRemoveFrame.verify|verify} messages.
                 * @function encode
                 * @memberof tools.simrail.backend.DispatchPostRemoveFrame
                 * @static
                 * @param {tools.simrail.backend.IDispatchPostRemoveFrame} message DispatchPostRemoveFrame message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DispatchPostRemoveFrame.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.baseData != null && Object.hasOwnProperty.call(message, "baseData"))
                        $root.tools.simrail.backend.BaseFrameData.encode(message.baseData, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.postId != null && Object.hasOwnProperty.call(message, "postId"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.postId);
                    return writer;
                };

                /**
                 * Encodes the specified DispatchPostRemoveFrame message, length delimited. Does not implicitly {@link tools.simrail.backend.DispatchPostRemoveFrame.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof tools.simrail.backend.DispatchPostRemoveFrame
                 * @static
                 * @param {tools.simrail.backend.IDispatchPostRemoveFrame} message DispatchPostRemoveFrame message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DispatchPostRemoveFrame.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a DispatchPostRemoveFrame message from the specified reader or buffer.
                 * @function decode
                 * @memberof tools.simrail.backend.DispatchPostRemoveFrame
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {tools.simrail.backend.DispatchPostRemoveFrame} DispatchPostRemoveFrame
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DispatchPostRemoveFrame.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.tools.simrail.backend.DispatchPostRemoveFrame();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.baseData = $root.tools.simrail.backend.BaseFrameData.decode(reader, reader.uint32());
                                break;
                            }
                        case 2: {
                                message.postId = reader.string();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a DispatchPostRemoveFrame message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof tools.simrail.backend.DispatchPostRemoveFrame
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {tools.simrail.backend.DispatchPostRemoveFrame} DispatchPostRemoveFrame
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DispatchPostRemoveFrame.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a DispatchPostRemoveFrame message.
                 * @function verify
                 * @memberof tools.simrail.backend.DispatchPostRemoveFrame
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                DispatchPostRemoveFrame.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.baseData != null && message.hasOwnProperty("baseData")) {
                        let error = $root.tools.simrail.backend.BaseFrameData.verify(message.baseData);
                        if (error)
                            return "baseData." + error;
                    }
                    if (message.postId != null && message.hasOwnProperty("postId"))
                        if (!$util.isString(message.postId))
                            return "postId: string expected";
                    return null;
                };

                /**
                 * Creates a DispatchPostRemoveFrame message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof tools.simrail.backend.DispatchPostRemoveFrame
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {tools.simrail.backend.DispatchPostRemoveFrame} DispatchPostRemoveFrame
                 */
                DispatchPostRemoveFrame.fromObject = function fromObject(object) {
                    if (object instanceof $root.tools.simrail.backend.DispatchPostRemoveFrame)
                        return object;
                    let message = new $root.tools.simrail.backend.DispatchPostRemoveFrame();
                    if (object.baseData != null) {
                        if (typeof object.baseData !== "object")
                            throw TypeError(".tools.simrail.backend.DispatchPostRemoveFrame.baseData: object expected");
                        message.baseData = $root.tools.simrail.backend.BaseFrameData.fromObject(object.baseData);
                    }
                    if (object.postId != null)
                        message.postId = String(object.postId);
                    return message;
                };

                /**
                 * Creates a plain object from a DispatchPostRemoveFrame message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof tools.simrail.backend.DispatchPostRemoveFrame
                 * @static
                 * @param {tools.simrail.backend.DispatchPostRemoveFrame} message DispatchPostRemoveFrame
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                DispatchPostRemoveFrame.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.baseData = null;
                        object.postId = "";
                    }
                    if (message.baseData != null && message.hasOwnProperty("baseData"))
                        object.baseData = $root.tools.simrail.backend.BaseFrameData.toObject(message.baseData, options);
                    if (message.postId != null && message.hasOwnProperty("postId"))
                        object.postId = message.postId;
                    return object;
                };

                /**
                 * Converts this DispatchPostRemoveFrame to JSON.
                 * @function toJSON
                 * @memberof tools.simrail.backend.DispatchPostRemoveFrame
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                DispatchPostRemoveFrame.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for DispatchPostRemoveFrame
                 * @function getTypeUrl
                 * @memberof tools.simrail.backend.DispatchPostRemoveFrame
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                DispatchPostRemoveFrame.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/tools.simrail.backend.DispatchPostRemoveFrame";
                };

                return DispatchPostRemoveFrame;
            })();

            backend.ServerUpdateFrame = (function() {

                /**
                 * Properties of a ServerUpdateFrame.
                 * @memberof tools.simrail.backend
                 * @interface IServerUpdateFrame
                 * @property {tools.simrail.backend.IBaseFrameData|undefined} [baseData] ServerUpdateFrame baseData
                 * @property {tools.simrail.backend.IIdHolder|undefined} [ids] ServerUpdateFrame ids
                 * @property {tools.simrail.backend.IServerData|undefined} [serverData] ServerUpdateFrame serverData
                 */

                /**
                 * Constructs a new ServerUpdateFrame.
                 * @memberof tools.simrail.backend
                 * @classdesc Represents a ServerUpdateFrame.
                 * @implements IServerUpdateFrame
                 * @constructor
                 * @param {tools.simrail.backend.IServerUpdateFrame=} [properties] Properties to set
                 */
                function ServerUpdateFrame(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ServerUpdateFrame baseData.
                 * @member {tools.simrail.backend.BaseFrameData} baseData
                 * @memberof tools.simrail.backend.ServerUpdateFrame
                 * @instance
                 */
                ServerUpdateFrame.prototype.baseData = null;

                /**
                 * ServerUpdateFrame ids.
                 * @member {tools.simrail.backend.IdHolder} ids
                 * @memberof tools.simrail.backend.ServerUpdateFrame
                 * @instance
                 */
                ServerUpdateFrame.prototype.ids = null;

                /**
                 * ServerUpdateFrame serverData.
                 * @member {tools.simrail.backend.ServerData} serverData
                 * @memberof tools.simrail.backend.ServerUpdateFrame
                 * @instance
                 */
                ServerUpdateFrame.prototype.serverData = null;

                /**
                 * Encodes the specified ServerUpdateFrame message. Does not implicitly {@link tools.simrail.backend.ServerUpdateFrame.verify|verify} messages.
                 * @function encode
                 * @memberof tools.simrail.backend.ServerUpdateFrame
                 * @static
                 * @param {tools.simrail.backend.IServerUpdateFrame} message ServerUpdateFrame message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ServerUpdateFrame.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.baseData != null && Object.hasOwnProperty.call(message, "baseData"))
                        $root.tools.simrail.backend.BaseFrameData.encode(message.baseData, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.ids != null && Object.hasOwnProperty.call(message, "ids"))
                        $root.tools.simrail.backend.IdHolder.encode(message.ids, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.serverData != null && Object.hasOwnProperty.call(message, "serverData"))
                        $root.tools.simrail.backend.ServerData.encode(message.serverData, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified ServerUpdateFrame message, length delimited. Does not implicitly {@link tools.simrail.backend.ServerUpdateFrame.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof tools.simrail.backend.ServerUpdateFrame
                 * @static
                 * @param {tools.simrail.backend.IServerUpdateFrame} message ServerUpdateFrame message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ServerUpdateFrame.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a ServerUpdateFrame message from the specified reader or buffer.
                 * @function decode
                 * @memberof tools.simrail.backend.ServerUpdateFrame
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {tools.simrail.backend.ServerUpdateFrame} ServerUpdateFrame
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ServerUpdateFrame.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.tools.simrail.backend.ServerUpdateFrame();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.baseData = $root.tools.simrail.backend.BaseFrameData.decode(reader, reader.uint32());
                                break;
                            }
                        case 2: {
                                message.ids = $root.tools.simrail.backend.IdHolder.decode(reader, reader.uint32());
                                break;
                            }
                        case 3: {
                                message.serverData = $root.tools.simrail.backend.ServerData.decode(reader, reader.uint32());
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a ServerUpdateFrame message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof tools.simrail.backend.ServerUpdateFrame
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {tools.simrail.backend.ServerUpdateFrame} ServerUpdateFrame
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ServerUpdateFrame.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a ServerUpdateFrame message.
                 * @function verify
                 * @memberof tools.simrail.backend.ServerUpdateFrame
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ServerUpdateFrame.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.baseData != null && message.hasOwnProperty("baseData")) {
                        let error = $root.tools.simrail.backend.BaseFrameData.verify(message.baseData);
                        if (error)
                            return "baseData." + error;
                    }
                    if (message.ids != null && message.hasOwnProperty("ids")) {
                        let error = $root.tools.simrail.backend.IdHolder.verify(message.ids);
                        if (error)
                            return "ids." + error;
                    }
                    if (message.serverData != null && message.hasOwnProperty("serverData")) {
                        let error = $root.tools.simrail.backend.ServerData.verify(message.serverData);
                        if (error)
                            return "serverData." + error;
                    }
                    return null;
                };

                /**
                 * Creates a ServerUpdateFrame message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof tools.simrail.backend.ServerUpdateFrame
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {tools.simrail.backend.ServerUpdateFrame} ServerUpdateFrame
                 */
                ServerUpdateFrame.fromObject = function fromObject(object) {
                    if (object instanceof $root.tools.simrail.backend.ServerUpdateFrame)
                        return object;
                    let message = new $root.tools.simrail.backend.ServerUpdateFrame();
                    if (object.baseData != null) {
                        if (typeof object.baseData !== "object")
                            throw TypeError(".tools.simrail.backend.ServerUpdateFrame.baseData: object expected");
                        message.baseData = $root.tools.simrail.backend.BaseFrameData.fromObject(object.baseData);
                    }
                    if (object.ids != null) {
                        if (typeof object.ids !== "object")
                            throw TypeError(".tools.simrail.backend.ServerUpdateFrame.ids: object expected");
                        message.ids = $root.tools.simrail.backend.IdHolder.fromObject(object.ids);
                    }
                    if (object.serverData != null) {
                        if (typeof object.serverData !== "object")
                            throw TypeError(".tools.simrail.backend.ServerUpdateFrame.serverData: object expected");
                        message.serverData = $root.tools.simrail.backend.ServerData.fromObject(object.serverData);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a ServerUpdateFrame message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof tools.simrail.backend.ServerUpdateFrame
                 * @static
                 * @param {tools.simrail.backend.ServerUpdateFrame} message ServerUpdateFrame
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ServerUpdateFrame.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.baseData = null;
                        object.ids = null;
                        object.serverData = null;
                    }
                    if (message.baseData != null && message.hasOwnProperty("baseData"))
                        object.baseData = $root.tools.simrail.backend.BaseFrameData.toObject(message.baseData, options);
                    if (message.ids != null && message.hasOwnProperty("ids"))
                        object.ids = $root.tools.simrail.backend.IdHolder.toObject(message.ids, options);
                    if (message.serverData != null && message.hasOwnProperty("serverData"))
                        object.serverData = $root.tools.simrail.backend.ServerData.toObject(message.serverData, options);
                    return object;
                };

                /**
                 * Converts this ServerUpdateFrame to JSON.
                 * @function toJSON
                 * @memberof tools.simrail.backend.ServerUpdateFrame
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ServerUpdateFrame.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for ServerUpdateFrame
                 * @function getTypeUrl
                 * @memberof tools.simrail.backend.ServerUpdateFrame
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                ServerUpdateFrame.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/tools.simrail.backend.ServerUpdateFrame";
                };

                return ServerUpdateFrame;
            })();

            backend.ServerRemoveFrame = (function() {

                /**
                 * Properties of a ServerRemoveFrame.
                 * @memberof tools.simrail.backend
                 * @interface IServerRemoveFrame
                 * @property {tools.simrail.backend.IBaseFrameData|undefined} [baseData] ServerRemoveFrame baseData
                 * @property {string|undefined} [serverId] ServerRemoveFrame serverId
                 */

                /**
                 * Constructs a new ServerRemoveFrame.
                 * @memberof tools.simrail.backend
                 * @classdesc Represents a ServerRemoveFrame.
                 * @implements IServerRemoveFrame
                 * @constructor
                 * @param {tools.simrail.backend.IServerRemoveFrame=} [properties] Properties to set
                 */
                function ServerRemoveFrame(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ServerRemoveFrame baseData.
                 * @member {tools.simrail.backend.BaseFrameData} baseData
                 * @memberof tools.simrail.backend.ServerRemoveFrame
                 * @instance
                 */
                ServerRemoveFrame.prototype.baseData = null;

                /**
                 * ServerRemoveFrame serverId.
                 * @member {string} serverId
                 * @memberof tools.simrail.backend.ServerRemoveFrame
                 * @instance
                 */
                ServerRemoveFrame.prototype.serverId = "";

                /**
                 * Encodes the specified ServerRemoveFrame message. Does not implicitly {@link tools.simrail.backend.ServerRemoveFrame.verify|verify} messages.
                 * @function encode
                 * @memberof tools.simrail.backend.ServerRemoveFrame
                 * @static
                 * @param {tools.simrail.backend.IServerRemoveFrame} message ServerRemoveFrame message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ServerRemoveFrame.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.baseData != null && Object.hasOwnProperty.call(message, "baseData"))
                        $root.tools.simrail.backend.BaseFrameData.encode(message.baseData, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.serverId != null && Object.hasOwnProperty.call(message, "serverId"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.serverId);
                    return writer;
                };

                /**
                 * Encodes the specified ServerRemoveFrame message, length delimited. Does not implicitly {@link tools.simrail.backend.ServerRemoveFrame.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof tools.simrail.backend.ServerRemoveFrame
                 * @static
                 * @param {tools.simrail.backend.IServerRemoveFrame} message ServerRemoveFrame message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ServerRemoveFrame.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a ServerRemoveFrame message from the specified reader or buffer.
                 * @function decode
                 * @memberof tools.simrail.backend.ServerRemoveFrame
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {tools.simrail.backend.ServerRemoveFrame} ServerRemoveFrame
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ServerRemoveFrame.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.tools.simrail.backend.ServerRemoveFrame();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.baseData = $root.tools.simrail.backend.BaseFrameData.decode(reader, reader.uint32());
                                break;
                            }
                        case 2: {
                                message.serverId = reader.string();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a ServerRemoveFrame message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof tools.simrail.backend.ServerRemoveFrame
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {tools.simrail.backend.ServerRemoveFrame} ServerRemoveFrame
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ServerRemoveFrame.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a ServerRemoveFrame message.
                 * @function verify
                 * @memberof tools.simrail.backend.ServerRemoveFrame
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ServerRemoveFrame.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.baseData != null && message.hasOwnProperty("baseData")) {
                        let error = $root.tools.simrail.backend.BaseFrameData.verify(message.baseData);
                        if (error)
                            return "baseData." + error;
                    }
                    if (message.serverId != null && message.hasOwnProperty("serverId"))
                        if (!$util.isString(message.serverId))
                            return "serverId: string expected";
                    return null;
                };

                /**
                 * Creates a ServerRemoveFrame message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof tools.simrail.backend.ServerRemoveFrame
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {tools.simrail.backend.ServerRemoveFrame} ServerRemoveFrame
                 */
                ServerRemoveFrame.fromObject = function fromObject(object) {
                    if (object instanceof $root.tools.simrail.backend.ServerRemoveFrame)
                        return object;
                    let message = new $root.tools.simrail.backend.ServerRemoveFrame();
                    if (object.baseData != null) {
                        if (typeof object.baseData !== "object")
                            throw TypeError(".tools.simrail.backend.ServerRemoveFrame.baseData: object expected");
                        message.baseData = $root.tools.simrail.backend.BaseFrameData.fromObject(object.baseData);
                    }
                    if (object.serverId != null)
                        message.serverId = String(object.serverId);
                    return message;
                };

                /**
                 * Creates a plain object from a ServerRemoveFrame message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof tools.simrail.backend.ServerRemoveFrame
                 * @static
                 * @param {tools.simrail.backend.ServerRemoveFrame} message ServerRemoveFrame
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ServerRemoveFrame.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.baseData = null;
                        object.serverId = "";
                    }
                    if (message.baseData != null && message.hasOwnProperty("baseData"))
                        object.baseData = $root.tools.simrail.backend.BaseFrameData.toObject(message.baseData, options);
                    if (message.serverId != null && message.hasOwnProperty("serverId"))
                        object.serverId = message.serverId;
                    return object;
                };

                /**
                 * Converts this ServerRemoveFrame to JSON.
                 * @function toJSON
                 * @memberof tools.simrail.backend.ServerRemoveFrame
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ServerRemoveFrame.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for ServerRemoveFrame
                 * @function getTypeUrl
                 * @memberof tools.simrail.backend.ServerRemoveFrame
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                ServerRemoveFrame.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/tools.simrail.backend.ServerRemoveFrame";
                };

                return ServerRemoveFrame;
            })();

            return backend;
        })();

        return simrail;
    })();

    return tools;
})();

export { $root as default };
