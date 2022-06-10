/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { RawExtension } from "../../../../../../k8s.io/apimachinery/pkg/runtime/generated";

export const protobufPackage = "k8s.io.apimachinery.pkg.apis.meta.v1";

/**
 * APIGroup contains the name, the supported versions, and the preferred version
 * of a group.
 */
export interface APIGroup {
  /** name is the name of the group. */
  name: string;
  /** versions are the versions supported in this group. */
  versions: GroupVersionForDiscovery[];
  /**
   * preferredVersion is the version preferred by the API server, which
   * probably is the storage version.
   * +optional
   */
  preferredVersion?: GroupVersionForDiscovery;
  /**
   * a map of client CIDR to server address that is serving this group.
   * This is to help clients reach servers in the most network-efficient way possible.
   * Clients can use the appropriate server address as per the CIDR that they match.
   * In case of multiple matches, clients should use the longest matching CIDR.
   * The server returns only those CIDRs that it thinks that the client can match.
   * For example: the master will return an internal IP CIDR only, if the client reaches the server using an internal IP.
   * Server looks at X-Forwarded-For header or X-Real-Ip header or request.RemoteAddr (in that order) to get the client IP.
   * +optional
   */
  serverAddressByClientCIDRs: ServerAddressByClientCIDR[];
}

/**
 * APIGroupList is a list of APIGroup, to allow clients to discover the API at
 * /apis.
 */
export interface APIGroupList {
  /** groups is a list of APIGroup. */
  groups: APIGroup[];
}

/** APIResource specifies the name of a resource and whether it is namespaced. */
export interface APIResource {
  /** name is the plural name of the resource. */
  name: string;
  /**
   * singularName is the singular name of the resource.  This allows clients to handle plural and singular opaquely.
   * The singularName is more correct for reporting status on a single item and both singular and plural are allowed
   * from the kubectl CLI interface.
   */
  singularName: string;
  /** namespaced indicates if a resource is namespaced or not. */
  namespaced: boolean;
  /**
   * group is the preferred group of the resource.  Empty implies the group of the containing resource list.
   * For subresources, this may have a different value, for example: Scale".
   */
  group: string;
  /**
   * version is the preferred version of the resource.  Empty implies the version of the containing resource list
   * For subresources, this may have a different value, for example: v1 (while inside a v1beta1 version of the core resource's group)".
   */
  version: string;
  /** kind is the kind for the resource (e.g. 'Foo' is the kind for a resource 'foo') */
  kind: string;
  /**
   * verbs is a list of supported kube verbs (this includes get, list, watch, create,
   * update, patch, delete, deletecollection, and proxy)
   */
  verbs?: Verbs;
  /** shortNames is a list of suggested short names of the resource. */
  shortNames: string[];
  /** categories is a list of the grouped resources this resource belongs to (e.g. 'all') */
  categories: string[];
  /**
   * The hash value of the storage version, the version this resource is
   * converted to when written to the data store. Value must be treated
   * as opaque by clients. Only equality comparison on the value is valid.
   * This is an alpha feature and may change or be removed in the future.
   * The field is populated by the apiserver only if the
   * StorageVersionHash feature gate is enabled.
   * This field will remain optional even if it graduates.
   * +optional
   */
  storageVersionHash: string;
}

/**
 * APIResourceList is a list of APIResource, it is used to expose the name of the
 * resources supported in a specific group and version, and if the resource
 * is namespaced.
 */
export interface APIResourceList {
  /** groupVersion is the group and version this APIResourceList is for. */
  groupVersion: string;
  /** resources contains the name of the resources and if they are namespaced. */
  resources: APIResource[];
}

/**
 * APIVersions lists the versions that are available, to allow clients to
 * discover the API at /api, which is the root path of the legacy v1 API.
 *
 * +protobuf.options.(gogoproto.goproto_stringer)=false
 * +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object
 */
export interface APIVersions {
  /** versions are the api versions that are available. */
  versions: string[];
  /**
   * a map of client CIDR to server address that is serving this group.
   * This is to help clients reach servers in the most network-efficient way possible.
   * Clients can use the appropriate server address as per the CIDR that they match.
   * In case of multiple matches, clients should use the longest matching CIDR.
   * The server returns only those CIDRs that it thinks that the client can match.
   * For example: the master will return an internal IP CIDR only, if the client reaches the server using an internal IP.
   * Server looks at X-Forwarded-For header or X-Real-Ip header or request.RemoteAddr (in that order) to get the client IP.
   */
  serverAddressByClientCIDRs: ServerAddressByClientCIDR[];
}

/**
 * ApplyOptions may be provided when applying an API object.
 * FieldManager is required for apply requests.
 * ApplyOptions is equivalent to PatchOptions. It is provided as a convenience with documentation
 * that speaks specifically to how the options fields relate to apply.
 */
export interface ApplyOptions {
  /**
   * When present, indicates that modifications should not be
   * persisted. An invalid or unrecognized dryRun directive will
   * result in an error response and no further processing of the
   * request. Valid values are:
   * - All: all dry run stages will be processed
   * +optional
   */
  dryRun: string[];
  /**
   * Force is going to "force" Apply requests. It means user will
   * re-acquire conflicting fields owned by other people.
   */
  force: boolean;
  /**
   * fieldManager is a name associated with the actor or entity
   * that is making these changes. The value must be less than or
   * 128 characters long, and only contain printable characters,
   * as defined by https://golang.org/pkg/unicode/#IsPrint. This
   * field is required.
   */
  fieldManager: string;
}

/**
 * Condition contains details for one aspect of the current state of this API Resource.
 * ---
 * This struct is intended for direct use as an array at the field path .status.conditions.  For example,
 * type FooStatus struct{
 *     // Represents the observations of a foo's current state.
 *     // Known .status.conditions.type are: "Available", "Progressing", and "Degraded"
 *     // +patchMergeKey=type
 *     // +patchStrategy=merge
 *     // +listType=map
 *     // +listMapKey=type
 *     Conditions []metav1.Condition `json:"conditions,omitempty" patchStrategy:"merge" patchMergeKey:"type" protobuf:"bytes,1,rep,name=conditions"`
 *
 *     // other fields
 * }
 */
export interface Condition {
  /**
   * type of condition in CamelCase or in foo.example.com/CamelCase.
   * ---
   * Many .condition.type values are consistent across resources like Available, but because arbitrary conditions can be
   * useful (see .node.status.conditions), the ability to deconflict is important.
   * The regex it matches is (dns1123SubdomainFmt/)?(qualifiedNameFmt)
   * +required
   * +kubebuilder:validation:Required
   * +kubebuilder:validation:Pattern=`^([a-z0-9]([-a-z0-9]*[a-z0-9])?(\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)* /)?(([A-Za-z0-9][-A-Za-z0-9_.]*)?[A-Za-z0-9])$`
   * +kubebuilder:validation:MaxLength=316
   */
  type: string;
  /**
   * status of the condition, one of True, False, Unknown.
   * +required
   * +kubebuilder:validation:Required
   * +kubebuilder:validation:Enum=True;False;Unknown
   */
  status: string;
  /**
   * observedGeneration represents the .metadata.generation that the condition was set based upon.
   * For instance, if .metadata.generation is currently 12, but the .status.conditions[x].observedGeneration is 9, the condition is out of date
   * with respect to the current state of the instance.
   * +optional
   * +kubebuilder:validation:Minimum=0
   */
  observedGeneration: number;
  /**
   * lastTransitionTime is the last time the condition transitioned from one status to another.
   * This should be when the underlying condition changed.  If that is not known, then using the time when the API field changed is acceptable.
   * +required
   * +kubebuilder:validation:Required
   * +kubebuilder:validation:Type=string
   * +kubebuilder:validation:Format=date-time
   */
  lastTransitionTime?: Time;
  /**
   * reason contains a programmatic identifier indicating the reason for the condition's last transition.
   * Producers of specific condition types may define expected values and meanings for this field,
   * and whether the values are considered a guaranteed API.
   * The value should be a CamelCase string.
   * This field may not be empty.
   * +required
   * +kubebuilder:validation:Required
   * +kubebuilder:validation:MaxLength=1024
   * +kubebuilder:validation:MinLength=1
   * +kubebuilder:validation:Pattern=`^[A-Za-z]([A-Za-z0-9_,:]*[A-Za-z0-9_])?$`
   */
  reason: string;
  /**
   * message is a human readable message indicating details about the transition.
   * This may be an empty string.
   * +required
   * +kubebuilder:validation:Required
   * +kubebuilder:validation:MaxLength=32768
   */
  message: string;
}

/** CreateOptions may be provided when creating an API object. */
export interface CreateOptions {
  /**
   * When present, indicates that modifications should not be
   * persisted. An invalid or unrecognized dryRun directive will
   * result in an error response and no further processing of the
   * request. Valid values are:
   * - All: all dry run stages will be processed
   * +optional
   */
  dryRun: string[];
  /**
   * fieldManager is a name associated with the actor or entity
   * that is making these changes. The value must be less than or
   * 128 characters long, and only contain printable characters,
   * as defined by https://golang.org/pkg/unicode/#IsPrint.
   * +optional
   */
  fieldManager: string;
}

/** DeleteOptions may be provided when deleting an API object. */
export interface DeleteOptions {
  /**
   * The duration in seconds before the object should be deleted. Value must be non-negative integer.
   * The value zero indicates delete immediately. If this value is nil, the default grace period for the
   * specified type will be used.
   * Defaults to a per object value if not specified. zero means delete immediately.
   * +optional
   */
  gracePeriodSeconds: number;
  /**
   * Must be fulfilled before a deletion is carried out. If not possible, a 409 Conflict status will be
   * returned.
   * +k8s:conversion-gen=false
   * +optional
   */
  preconditions?: Preconditions;
  /**
   * Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7.
   * Should the dependent objects be orphaned. If true/false, the "orphan"
   * finalizer will be added to/removed from the object's finalizers list.
   * Either this field or PropagationPolicy may be set, but not both.
   * +optional
   */
  orphanDependents: boolean;
  /**
   * Whether and how garbage collection will be performed.
   * Either this field or OrphanDependents may be set, but not both.
   * The default policy is decided by the existing finalizer set in the
   * metadata.finalizers and the resource-specific default policy.
   * Acceptable values are: 'Orphan' - orphan the dependents; 'Background' -
   * allow the garbage collector to delete the dependents in the background;
   * 'Foreground' - a cascading policy that deletes all dependents in the
   * foreground.
   * +optional
   */
  propagationPolicy: string;
  /**
   * When present, indicates that modifications should not be
   * persisted. An invalid or unrecognized dryRun directive will
   * result in an error response and no further processing of the
   * request. Valid values are:
   * - All: all dry run stages will be processed
   * +optional
   */
  dryRun: string[];
}

/**
 * Duration is a wrapper around time.Duration which supports correct
 * marshaling to YAML and JSON. In particular, it marshals into strings, which
 * can be used as map keys in json.
 */
export interface Duration {
  duration: number;
}

/**
 * FieldsV1 stores a set of fields in a data structure like a Trie, in JSON format.
 *
 * Each key is either a '.' representing the field itself, and will always map to an empty set,
 * or a string representing a sub-field or item. The string will follow one of these four formats:
 * 'f:<name>', where <name> is the name of a field in a struct, or key in a map
 * 'v:<value>', where <value> is the exact json formatted value of a list item
 * 'i:<index>', where <index> is position of a item in a list
 * 'k:<keys>', where <keys> is a map of  a list item's key fields to their unique values
 * If a key maps to an empty Fields value, the field that key represents is part of the set.
 *
 * The exact format is defined in sigs.k8s.io/structured-merge-diff
 * +protobuf.options.(gogoproto.goproto_stringer)=false
 */
export interface FieldsV1 {
  /** Raw is the underlying serialization of this object. */
  Raw: Uint8Array;
}

/** GetOptions is the standard query options to the standard REST get call. */
export interface GetOptions {
  /**
   * resourceVersion sets a constraint on what resource versions a request may be served from.
   * See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for
   * details.
   *
   * Defaults to unset
   * +optional
   */
  resourceVersion: string;
}

/**
 * GroupKind specifies a Group and a Kind, but does not force a version.  This is useful for identifying
 * concepts during lookup stages without having partially valid types
 *
 * +protobuf.options.(gogoproto.goproto_stringer)=false
 */
export interface GroupKind {
  group: string;
  kind: string;
}

/**
 * GroupResource specifies a Group and a Resource, but does not force a version.  This is useful for identifying
 * concepts during lookup stages without having partially valid types
 *
 * +protobuf.options.(gogoproto.goproto_stringer)=false
 */
export interface GroupResource {
  group: string;
  resource: string;
}

/**
 * GroupVersion contains the "group" and the "version", which uniquely identifies the API.
 *
 * +protobuf.options.(gogoproto.goproto_stringer)=false
 */
export interface GroupVersion {
  group: string;
  version: string;
}

/**
 * GroupVersion contains the "group/version" and "version" string of a version.
 * It is made a struct to keep extensibility.
 */
export interface GroupVersionForDiscovery {
  /** groupVersion specifies the API group and version in the form "group/version" */
  groupVersion: string;
  /**
   * version specifies the version in the form of "version". This is to save
   * the clients the trouble of splitting the GroupVersion.
   */
  version: string;
}

/**
 * GroupVersionKind unambiguously identifies a kind.  It doesn't anonymously include GroupVersion
 * to avoid automatic coersion.  It doesn't use a GroupVersion to avoid custom marshalling
 *
 * +protobuf.options.(gogoproto.goproto_stringer)=false
 */
export interface GroupVersionKind {
  group: string;
  version: string;
  kind: string;
}

/**
 * GroupVersionResource unambiguously identifies a resource.  It doesn't anonymously include GroupVersion
 * to avoid automatic coersion.  It doesn't use a GroupVersion to avoid custom marshalling
 *
 * +protobuf.options.(gogoproto.goproto_stringer)=false
 */
export interface GroupVersionResource {
  group: string;
  version: string;
  resource: string;
}

/**
 * A label selector is a label query over a set of resources. The result of matchLabels and
 * matchExpressions are ANDed. An empty label selector matches all objects. A null
 * label selector matches no objects.
 * +structType=atomic
 */
export interface LabelSelector {
  /**
   * matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels
   * map is equivalent to an element of matchExpressions, whose key field is "key", the
   * operator is "In", and the values array contains only "value". The requirements are ANDed.
   * +optional
   */
  matchLabels: { [key: string]: string };
  /**
   * matchExpressions is a list of label selector requirements. The requirements are ANDed.
   * +optional
   */
  matchExpressions: LabelSelectorRequirement[];
}

export interface LabelSelector_MatchLabelsEntry {
  key: string;
  value: string;
}

/**
 * A label selector requirement is a selector that contains values, a key, and an operator that
 * relates the key and values.
 */
export interface LabelSelectorRequirement {
  /**
   * key is the label key that the selector applies to.
   * +patchMergeKey=key
   * +patchStrategy=merge
   */
  key: string;
  /**
   * operator represents a key's relationship to a set of values.
   * Valid operators are In, NotIn, Exists and DoesNotExist.
   */
  operator: string;
  /**
   * values is an array of string values. If the operator is In or NotIn,
   * the values array must be non-empty. If the operator is Exists or DoesNotExist,
   * the values array must be empty. This array is replaced during a strategic
   * merge patch.
   * +optional
   */
  values: string[];
}

/** List holds a list of objects, which may not be known by the server. */
export interface List {
  /**
   * Standard list metadata.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   * +optional
   */
  metadata?: ListMeta;
  /** List of objects */
  items: RawExtension[];
}

/**
 * ListMeta describes metadata that synthetic resources must have, including lists and
 * various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
 */
export interface ListMeta {
  /**
   * selfLink is a URL representing this object.
   * Populated by the system.
   * Read-only.
   *
   * DEPRECATED
   * Kubernetes will stop propagating this field in 1.20 release and the field is planned
   * to be removed in 1.21 release.
   * +optional
   */
  selfLink: string;
  /**
   * String that identifies the server's internal version of this object that
   * can be used by clients to determine when objects have changed.
   * Value must be treated as opaque by clients and passed unmodified back to the server.
   * Populated by the system.
   * Read-only.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#concurrency-control-and-consistency
   * +optional
   */
  resourceVersion: string;
  /**
   * continue may be set if the user set a limit on the number of items returned, and indicates that
   * the server has more data available. The value is opaque and may be used to issue another request
   * to the endpoint that served this list to retrieve the next set of available objects. Continuing a
   * consistent list may not be possible if the server configuration has changed or more than a few
   * minutes have passed. The resourceVersion field returned when using this continue value will be
   * identical to the value in the first response, unless you have received this token from an error
   * message.
   */
  continue: string;
  /**
   * remainingItemCount is the number of subsequent items in the list which are not included in this
   * list response. If the list request contained label or field selectors, then the number of
   * remaining items is unknown and the field will be left unset and omitted during serialization.
   * If the list is complete (either because it is not chunking or because this is the last chunk),
   * then there are no more remaining items and this field will be left unset and omitted during
   * serialization.
   * Servers older than v1.15 do not set this field.
   * The intended use of the remainingItemCount is *estimating* the size of a collection. Clients
   * should not rely on the remainingItemCount to be set or to be exact.
   * +optional
   */
  remainingItemCount: number;
}

/** ListOptions is the query options to a standard REST list call. */
export interface ListOptions {
  /**
   * A selector to restrict the list of returned objects by their labels.
   * Defaults to everything.
   * +optional
   */
  labelSelector: string;
  /**
   * A selector to restrict the list of returned objects by their fields.
   * Defaults to everything.
   * +optional
   */
  fieldSelector: string;
  /**
   * Watch for changes to the described resources and return them as a stream of
   * add, update, and remove notifications. Specify resourceVersion.
   * +optional
   */
  watch: boolean;
  /**
   * allowWatchBookmarks requests watch events with type "BOOKMARK".
   * Servers that do not implement bookmarks may ignore this flag and
   * bookmarks are sent at the server's discretion. Clients should not
   * assume bookmarks are returned at any specific interval, nor may they
   * assume the server will send any BOOKMARK event during a session.
   * If this is not a watch, this field is ignored.
   * +optional
   */
  allowWatchBookmarks: boolean;
  /**
   * resourceVersion sets a constraint on what resource versions a request may be served from.
   * See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for
   * details.
   *
   * Defaults to unset
   * +optional
   */
  resourceVersion: string;
  /**
   * resourceVersionMatch determines how resourceVersion is applied to list calls.
   * It is highly recommended that resourceVersionMatch be set for list calls where
   * resourceVersion is set
   * See https://kubernetes.io/docs/reference/using-api/api-concepts/#resource-versions for
   * details.
   *
   * Defaults to unset
   * +optional
   */
  resourceVersionMatch: string;
  /**
   * Timeout for the list/watch call.
   * This limits the duration of the call, regardless of any activity or inactivity.
   * +optional
   */
  timeoutSeconds: number;
  /**
   * limit is a maximum number of responses to return for a list call. If more items exist, the
   * server will set the `continue` field on the list metadata to a value that can be used with the
   * same initial query to retrieve the next set of results. Setting a limit may return fewer than
   * the requested amount of items (up to zero items) in the event all requested objects are
   * filtered out and clients should only use the presence of the continue field to determine whether
   * more results are available. Servers may choose not to support the limit argument and will return
   * all of the available results. If limit is specified and the continue field is empty, clients may
   * assume that no more results are available. This field is not supported if watch is true.
   *
   * The server guarantees that the objects returned when using continue will be identical to issuing
   * a single list call without a limit - that is, no objects created, modified, or deleted after the
   * first request is issued will be included in any subsequent continued requests. This is sometimes
   * referred to as a consistent snapshot, and ensures that a client that is using limit to receive
   * smaller chunks of a very large result can ensure they see all possible objects. If objects are
   * updated during a chunked list the version of the object that was present at the time the first list
   * result was calculated is returned.
   */
  limit: number;
  /**
   * The continue option should be set when retrieving more results from the server. Since this value is
   * server defined, clients may only use the continue value from a previous query result with identical
   * query parameters (except for the value of continue) and the server may reject a continue value it
   * does not recognize. If the specified continue value is no longer valid whether due to expiration
   * (generally five to fifteen minutes) or a configuration change on the server, the server will
   * respond with a 410 ResourceExpired error together with a continue token. If the client needs a
   * consistent list, it must restart their list without the continue field. Otherwise, the client may
   * send another list request with the token received with the 410 error, the server will respond with
   * a list starting from the next key, but from the latest snapshot, which is inconsistent from the
   * previous list results - objects that are created, modified, or deleted after the first list request
   * will be included in the response, as long as their keys are after the "next key".
   *
   * This field is not supported when watch is true. Clients may start a watch from the last
   * resourceVersion value returned by the server and not miss any modifications.
   */
  continue: string;
}

/**
 * ManagedFieldsEntry is a workflow-id, a FieldSet and the group version of the resource
 * that the fieldset applies to.
 */
export interface ManagedFieldsEntry {
  /** Manager is an identifier of the workflow managing these fields. */
  manager: string;
  /**
   * Operation is the type of operation which lead to this ManagedFieldsEntry being created.
   * The only valid values for this field are 'Apply' and 'Update'.
   */
  operation: string;
  /**
   * APIVersion defines the version of this resource that this field set
   * applies to. The format is "group/version" just like the top-level
   * APIVersion field. It is necessary to track the version of a field
   * set because it cannot be automatically converted.
   */
  apiVersion: string;
  /**
   * Time is timestamp of when these fields were set. It should always be empty if Operation is 'Apply'
   * +optional
   */
  time?: Time;
  /**
   * FieldsType is the discriminator for the different fields format and version.
   * There is currently only one possible value: "FieldsV1"
   */
  fieldsType: string;
  /**
   * FieldsV1 holds the first JSON version format as described in the "FieldsV1" type.
   * +optional
   */
  fieldsV1?: FieldsV1;
  /**
   * Subresource is the name of the subresource used to update that object, or
   * empty string if the object was updated through the main resource. The
   * value of this field is used to distinguish between managers, even if they
   * share the same name. For example, a status update will be distinct from a
   * regular update using the same manager name.
   * Note that the APIVersion field is not related to the Subresource field and
   * it always corresponds to the version of the main resource.
   */
  subresource: string;
}

/**
 * MicroTime is version of Time with microsecond level precision.
 *
 * +protobuf.options.marshal=false
 * +protobuf.as=Timestamp
 * +protobuf.options.(gogoproto.goproto_stringer)=false
 */
export interface MicroTime {
  /**
   * Represents seconds of UTC time since Unix epoch
   * 1970-01-01T00:00:00Z. Must be from 0001-01-01T00:00:00Z to
   * 9999-12-31T23:59:59Z inclusive.
   */
  seconds: number;
  /**
   * Non-negative fractions of a second at nanosecond resolution. Negative
   * second values with fractions must still have non-negative nanos values
   * that count forward in time. Must be from 0 to 999,999,999
   * inclusive. This field may be limited in precision depending on context.
   */
  nanos: number;
}

/**
 * ObjectMeta is metadata that all persisted resources must have, which includes all objects
 * users must create.
 */
export interface ObjectMeta {
  /**
   * Name must be unique within a namespace. Is required when creating resources, although
   * some resources may allow a client to request the generation of an appropriate name
   * automatically. Name is primarily intended for creation idempotence and configuration
   * definition.
   * Cannot be updated.
   * More info: http://kubernetes.io/docs/user-guide/identifiers#names
   * +optional
   */
  name: string;
  /**
   * GenerateName is an optional prefix, used by the server, to generate a unique
   * name ONLY IF the Name field has not been provided.
   * If this field is used, the name returned to the client will be different
   * than the name passed. This value will also be combined with a unique suffix.
   * The provided value has the same validation rules as the Name field,
   * and may be truncated by the length of the suffix required to make the value
   * unique on the server.
   *
   * If this field is specified and the generated name exists, the server will
   * NOT return a 409 - instead, it will either return 201 Created or 500 with Reason
   * ServerTimeout indicating a unique name could not be found in the time allotted, and the client
   * should retry (optionally after the time indicated in the Retry-After header).
   *
   * Applied only if Name is not specified.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#idempotency
   * +optional
   */
  generateName: string;
  /**
   * Namespace defines the space within which each name must be unique. An empty namespace is
   * equivalent to the "default" namespace, but "default" is the canonical representation.
   * Not all objects are required to be scoped to a namespace - the value of this field for
   * those objects will be empty.
   *
   * Must be a DNS_LABEL.
   * Cannot be updated.
   * More info: http://kubernetes.io/docs/user-guide/namespaces
   * +optional
   */
  namespace: string;
  /**
   * SelfLink is a URL representing this object.
   * Populated by the system.
   * Read-only.
   *
   * DEPRECATED
   * Kubernetes will stop propagating this field in 1.20 release and the field is planned
   * to be removed in 1.21 release.
   * +optional
   */
  selfLink: string;
  /**
   * UID is the unique in time and space value for this object. It is typically generated by
   * the server on successful creation of a resource and is not allowed to change on PUT
   * operations.
   *
   * Populated by the system.
   * Read-only.
   * More info: http://kubernetes.io/docs/user-guide/identifiers#uids
   * +optional
   */
  uid: string;
  /**
   * An opaque value that represents the internal version of this object that can
   * be used by clients to determine when objects have changed. May be used for optimistic
   * concurrency, change detection, and the watch operation on a resource or set of resources.
   * Clients must treat these values as opaque and passed unmodified back to the server.
   * They may only be valid for a particular resource or set of resources.
   *
   * Populated by the system.
   * Read-only.
   * Value must be treated as opaque by clients and .
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#concurrency-control-and-consistency
   * +optional
   */
  resourceVersion: string;
  /**
   * A sequence number representing a specific generation of the desired state.
   * Populated by the system. Read-only.
   * +optional
   */
  generation: number;
  /**
   * CreationTimestamp is a timestamp representing the server time when this object was
   * created. It is not guaranteed to be set in happens-before order across separate operations.
   * Clients may not set this value. It is represented in RFC3339 form and is in UTC.
   *
   * Populated by the system.
   * Read-only.
   * Null for lists.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
   * +optional
   */
  creationTimestamp?: Time;
  /**
   * DeletionTimestamp is RFC 3339 date and time at which this resource will be deleted. This
   * field is set by the server when a graceful deletion is requested by the user, and is not
   * directly settable by a client. The resource is expected to be deleted (no longer visible
   * from resource lists, and not reachable by name) after the time in this field, once the
   * finalizers list is empty. As long as the finalizers list contains items, deletion is blocked.
   * Once the deletionTimestamp is set, this value may not be unset or be set further into the
   * future, although it may be shortened or the resource may be deleted prior to this time.
   * For example, a user may request that a pod is deleted in 30 seconds. The Kubelet will react
   * by sending a graceful termination signal to the containers in the pod. After that 30 seconds,
   * the Kubelet will send a hard termination signal (SIGKILL) to the container and after cleanup,
   * remove the pod from the API. In the presence of network partitions, this object may still
   * exist after this timestamp, until an administrator or automated process can determine the
   * resource is fully terminated.
   * If not set, graceful deletion of the object has not been requested.
   *
   * Populated by the system when a graceful deletion is requested.
   * Read-only.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
   * +optional
   */
  deletionTimestamp?: Time;
  /**
   * Number of seconds allowed for this object to gracefully terminate before
   * it will be removed from the system. Only set when deletionTimestamp is also set.
   * May only be shortened.
   * Read-only.
   * +optional
   */
  deletionGracePeriodSeconds: number;
  /**
   * Map of string keys and values that can be used to organize and categorize
   * (scope and select) objects. May match selectors of replication controllers
   * and services.
   * More info: http://kubernetes.io/docs/user-guide/labels
   * +optional
   */
  labels: { [key: string]: string };
  /**
   * Annotations is an unstructured key value map stored with a resource that may be
   * set by external tools to store and retrieve arbitrary metadata. They are not
   * queryable and should be preserved when modifying objects.
   * More info: http://kubernetes.io/docs/user-guide/annotations
   * +optional
   */
  annotations: { [key: string]: string };
  /**
   * List of objects depended by this object. If ALL objects in the list have
   * been deleted, this object will be garbage collected. If this object is managed by a controller,
   * then an entry in this list will point to this controller, with the controller field set to true.
   * There cannot be more than one managing controller.
   * +optional
   * +patchMergeKey=uid
   * +patchStrategy=merge
   */
  ownerReferences: OwnerReference[];
  /**
   * Must be empty before the object is deleted from the registry. Each entry
   * is an identifier for the responsible component that will remove the entry
   * from the list. If the deletionTimestamp of the object is non-nil, entries
   * in this list can only be removed.
   * Finalizers may be processed and removed in any order.  Order is NOT enforced
   * because it introduces significant risk of stuck finalizers.
   * finalizers is a shared field, any actor with permission can reorder it.
   * If the finalizer list is processed in order, then this can lead to a situation
   * in which the component responsible for the first finalizer in the list is
   * waiting for a signal (field value, external system, or other) produced by a
   * component responsible for a finalizer later in the list, resulting in a deadlock.
   * Without enforced ordering finalizers are free to order amongst themselves and
   * are not vulnerable to ordering changes in the list.
   * +optional
   * +patchStrategy=merge
   */
  finalizers: string[];
  /**
   * The name of the cluster which the object belongs to.
   * This is used to distinguish resources with same name and namespace in different clusters.
   * This field is not set anywhere right now and apiserver is going to ignore it if set in create or update request.
   * +optional
   */
  clusterName: string;
  /**
   * ManagedFields maps workflow-id and version to the set of fields
   * that are managed by that workflow. This is mostly for internal
   * housekeeping, and users typically shouldn't need to set or
   * understand this field. A workflow can be the user's name, a
   * controller's name, or the name of a specific apply path like
   * "ci-cd". The set of fields is always in the version that the
   * workflow used when modifying the object.
   *
   * +optional
   */
  managedFields: ManagedFieldsEntry[];
}

export interface ObjectMeta_LabelsEntry {
  key: string;
  value: string;
}

export interface ObjectMeta_AnnotationsEntry {
  key: string;
  value: string;
}

/**
 * OwnerReference contains enough information to let you identify an owning
 * object. An owning object must be in the same namespace as the dependent, or
 * be cluster-scoped, so there is no namespace field.
 * +structType=atomic
 */
export interface OwnerReference {
  /** API version of the referent. */
  apiVersion: string;
  /**
   * Kind of the referent.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   */
  kind: string;
  /**
   * Name of the referent.
   * More info: http://kubernetes.io/docs/user-guide/identifiers#names
   */
  name: string;
  /**
   * UID of the referent.
   * More info: http://kubernetes.io/docs/user-guide/identifiers#uids
   */
  uid: string;
  /**
   * If true, this reference points to the managing controller.
   * +optional
   */
  controller: boolean;
  /**
   * If true, AND if the owner has the "foregroundDeletion" finalizer, then
   * the owner cannot be deleted from the key-value store until this
   * reference is removed.
   * Defaults to false.
   * To set this field, a user needs "delete" permission of the owner,
   * otherwise 422 (Unprocessable Entity) will be returned.
   * +optional
   */
  blockOwnerDeletion: boolean;
}

/**
 * PartialObjectMetadata is a generic representation of any object with ObjectMeta. It allows clients
 * to get access to a particular ObjectMeta schema without knowing the details of the version.
 * +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object
 */
export interface PartialObjectMetadata {
  /**
   * Standard object's metadata.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
   * +optional
   */
  metadata?: ObjectMeta;
}

/**
 * PartialObjectMetadataList contains a list of objects containing only their metadata
 * +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object
 */
export interface PartialObjectMetadataList {
  /**
   * Standard list metadata.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   * +optional
   */
  metadata?: ListMeta;
  /** items contains each of the included items. */
  items: PartialObjectMetadata[];
}

/** Patch is provided to give a concrete name and type to the Kubernetes PATCH request body. */
export interface Patch {}

/**
 * PatchOptions may be provided when patching an API object.
 * PatchOptions is meant to be a superset of UpdateOptions.
 */
export interface PatchOptions {
  /**
   * When present, indicates that modifications should not be
   * persisted. An invalid or unrecognized dryRun directive will
   * result in an error response and no further processing of the
   * request. Valid values are:
   * - All: all dry run stages will be processed
   * +optional
   */
  dryRun: string[];
  /**
   * Force is going to "force" Apply requests. It means user will
   * re-acquire conflicting fields owned by other people. Force
   * flag must be unset for non-apply patch requests.
   * +optional
   */
  force: boolean;
  /**
   * fieldManager is a name associated with the actor or entity
   * that is making these changes. The value must be less than or
   * 128 characters long, and only contain printable characters,
   * as defined by https://golang.org/pkg/unicode/#IsPrint. This
   * field is required for apply requests
   * (application/apply-patch) but optional for non-apply patch
   * types (JsonPatch, MergePatch, StrategicMergePatch).
   * +optional
   */
  fieldManager: string;
}

/** Preconditions must be fulfilled before an operation (update, delete, etc.) is carried out. */
export interface Preconditions {
  /**
   * Specifies the target UID.
   * +optional
   */
  uid: string;
  /**
   * Specifies the target ResourceVersion
   * +optional
   */
  resourceVersion: string;
}

/**
 * RootPaths lists the paths available at root.
 * For example: "/healthz", "/apis".
 */
export interface RootPaths {
  /** paths are the paths available at root. */
  paths: string[];
}

/** ServerAddressByClientCIDR helps the client to determine the server address that they should use, depending on the clientCIDR that they match. */
export interface ServerAddressByClientCIDR {
  /** The CIDR with which clients can match their IP to figure out the server address that they should use. */
  clientCIDR: string;
  /**
   * Address of this server, suitable for a client that matches the above CIDR.
   * This can be a hostname, hostname:port, IP or IP:port.
   */
  serverAddress: string;
}

/** Status is a return value for calls that don't return other objects. */
export interface Status {
  /**
   * Standard list metadata.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   * +optional
   */
  metadata?: ListMeta;
  /**
   * Status of the operation.
   * One of: "Success" or "Failure".
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status
   * +optional
   */
  status: string;
  /**
   * A human-readable description of the status of this operation.
   * +optional
   */
  message: string;
  /**
   * A machine-readable description of why this operation is in the
   * "Failure" status. If this value is empty there
   * is no information available. A Reason clarifies an HTTP status
   * code but does not override it.
   * +optional
   */
  reason: string;
  /**
   * Extended data associated with the reason.  Each reason may define its
   * own extended details. This field is optional and the data returned
   * is not guaranteed to conform to any schema except that defined by
   * the reason type.
   * +optional
   */
  details?: StatusDetails;
  /**
   * Suggested HTTP return code for this status, 0 if not set.
   * +optional
   */
  code: number;
}

/**
 * StatusCause provides more information about an api.Status failure, including
 * cases when multiple errors are encountered.
 */
export interface StatusCause {
  /**
   * A machine-readable description of the cause of the error. If this value is
   * empty there is no information available.
   * +optional
   */
  reason: string;
  /**
   * A human-readable description of the cause of the error.  This field may be
   * presented as-is to a reader.
   * +optional
   */
  message: string;
  /**
   * The field of the resource that has caused this error, as named by its JSON
   * serialization. May include dot and postfix notation for nested attributes.
   * Arrays are zero-indexed.  Fields may appear more than once in an array of
   * causes due to fields having multiple errors.
   * Optional.
   *
   * Examples:
   *   "name" - the field "name" on the current resource
   *   "items[0].name" - the field "name" on the first array entry in "items"
   * +optional
   */
  field: string;
}

/**
 * StatusDetails is a set of additional properties that MAY be set by the
 * server to provide additional information about a response. The Reason
 * field of a Status object defines what attributes will be set. Clients
 * must ignore fields that do not match the defined type of each attribute,
 * and should assume that any attribute may be empty, invalid, or under
 * defined.
 */
export interface StatusDetails {
  /**
   * The name attribute of the resource associated with the status StatusReason
   * (when there is a single name which can be described).
   * +optional
   */
  name: string;
  /**
   * The group attribute of the resource associated with the status StatusReason.
   * +optional
   */
  group: string;
  /**
   * The kind attribute of the resource associated with the status StatusReason.
   * On some operations may differ from the requested resource Kind.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   * +optional
   */
  kind: string;
  /**
   * UID of the resource.
   * (when there is a single resource which can be described).
   * More info: http://kubernetes.io/docs/user-guide/identifiers#uids
   * +optional
   */
  uid: string;
  /**
   * The Causes array includes more details associated with the StatusReason
   * failure. Not all StatusReasons may provide detailed causes.
   * +optional
   */
  causes: StatusCause[];
  /**
   * If specified, the time in seconds before the operation should be retried. Some errors may indicate
   * the client must take an alternate action - for those errors this field may indicate how long to wait
   * before taking the alternate action.
   * +optional
   */
  retryAfterSeconds: number;
}

/**
 * TableOptions are used when a Table is requested by the caller.
 * +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object
 */
export interface TableOptions {
  /**
   * includeObject decides whether to include each object along with its columnar information.
   * Specifying "None" will return no object, specifying "Object" will return the full object contents, and
   * specifying "Metadata" (the default) will return the object's metadata in the PartialObjectMetadata kind
   * in version v1beta1 of the meta.k8s.io API group.
   */
  includeObject: string;
}

/**
 * Time is a wrapper around time.Time which supports correct
 * marshaling to YAML and JSON.  Wrappers are provided for many
 * of the factory methods that the time package offers.
 *
 * +protobuf.options.marshal=false
 * +protobuf.as=Timestamp
 * +protobuf.options.(gogoproto.goproto_stringer)=false
 */
export interface Time {
  /**
   * Represents seconds of UTC time since Unix epoch
   * 1970-01-01T00:00:00Z. Must be from 0001-01-01T00:00:00Z to
   * 9999-12-31T23:59:59Z inclusive.
   */
  seconds: number;
  /**
   * Non-negative fractions of a second at nanosecond resolution. Negative
   * second values with fractions must still have non-negative nanos values
   * that count forward in time. Must be from 0 to 999,999,999
   * inclusive. This field may be limited in precision depending on context.
   */
  nanos: number;
}

/**
 * Timestamp is a struct that is equivalent to Time, but intended for
 * protobuf marshalling/unmarshalling. It is generated into a serialization
 * that matches Time. Do not use in Go structs.
 */
export interface Timestamp {
  /**
   * Represents seconds of UTC time since Unix epoch
   * 1970-01-01T00:00:00Z. Must be from 0001-01-01T00:00:00Z to
   * 9999-12-31T23:59:59Z inclusive.
   */
  seconds: number;
  /**
   * Non-negative fractions of a second at nanosecond resolution. Negative
   * second values with fractions must still have non-negative nanos values
   * that count forward in time. Must be from 0 to 999,999,999
   * inclusive. This field may be limited in precision depending on context.
   */
  nanos: number;
}

/**
 * TypeMeta describes an individual object in an API response or request
 * with strings representing the type of the object and its API schema version.
 * Structures that are versioned or persisted should inline TypeMeta.
 *
 * +k8s:deepcopy-gen=false
 */
export interface TypeMeta {
  /**
   * Kind is a string value representing the REST resource this object represents.
   * Servers may infer this from the endpoint the client submits requests to.
   * Cannot be updated.
   * In CamelCase.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   * +optional
   */
  kind: string;
  /**
   * APIVersion defines the versioned schema of this representation of an object.
   * Servers should convert recognized schemas to the latest internal value, and
   * may reject unrecognized values.
   * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
   * +optional
   */
  apiVersion: string;
}

/**
 * UpdateOptions may be provided when updating an API object.
 * All fields in UpdateOptions should also be present in PatchOptions.
 */
export interface UpdateOptions {
  /**
   * When present, indicates that modifications should not be
   * persisted. An invalid or unrecognized dryRun directive will
   * result in an error response and no further processing of the
   * request. Valid values are:
   * - All: all dry run stages will be processed
   * +optional
   */
  dryRun: string[];
  /**
   * fieldManager is a name associated with the actor or entity
   * that is making these changes. The value must be less than or
   * 128 characters long, and only contain printable characters,
   * as defined by https://golang.org/pkg/unicode/#IsPrint.
   * +optional
   */
  fieldManager: string;
}

/**
 * Verbs masks the value so protobuf can generate
 *
 * +protobuf.nullable=true
 * +protobuf.options.(gogoproto.goproto_stringer)=false
 */
export interface Verbs {
  items: string[];
}

/**
 * Event represents a single event to a watched resource.
 *
 * +protobuf=true
 * +k8s:deepcopy-gen=true
 * +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object
 */
export interface WatchEvent {
  type: string;
  /**
   * Object is:
   *  * If Type is Added or Modified: the new state of the object.
   *  * If Type is Deleted: the state of the object immediately before deletion.
   *  * If Type is Error: *Status is recommended; other types may make sense
   *    depending on context.
   */
  object?: RawExtension;
}

function createBaseAPIGroup(): APIGroup {
  return {
    name: "",
    versions: [],
    preferredVersion: undefined,
    serverAddressByClientCIDRs: [],
  };
}

export const APIGroup = {
  encode(
    message: APIGroup,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    for (const v of message.versions) {
      GroupVersionForDiscovery.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.preferredVersion !== undefined) {
      GroupVersionForDiscovery.encode(
        message.preferredVersion,
        writer.uint32(26).fork()
      ).ldelim();
    }
    for (const v of message.serverAddressByClientCIDRs) {
      ServerAddressByClientCIDR.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): APIGroup {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAPIGroup();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.versions.push(
            GroupVersionForDiscovery.decode(reader, reader.uint32())
          );
          break;
        case 3:
          message.preferredVersion = GroupVersionForDiscovery.decode(
            reader,
            reader.uint32()
          );
          break;
        case 4:
          message.serverAddressByClientCIDRs.push(
            ServerAddressByClientCIDR.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): APIGroup {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      versions: Array.isArray(object?.versions)
        ? object.versions.map((e: any) => GroupVersionForDiscovery.fromJSON(e))
        : [],
      preferredVersion: isSet(object.preferredVersion)
        ? GroupVersionForDiscovery.fromJSON(object.preferredVersion)
        : undefined,
      serverAddressByClientCIDRs: Array.isArray(
        object?.serverAddressByClientCIDRs
      )
        ? object.serverAddressByClientCIDRs.map((e: any) =>
            ServerAddressByClientCIDR.fromJSON(e)
          )
        : [],
    };
  },

  toJSON(message: APIGroup): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    if (message.versions) {
      obj.versions = message.versions.map((e) =>
        e ? GroupVersionForDiscovery.toJSON(e) : undefined
      );
    } else {
      obj.versions = [];
    }
    message.preferredVersion !== undefined &&
      (obj.preferredVersion = message.preferredVersion
        ? GroupVersionForDiscovery.toJSON(message.preferredVersion)
        : undefined);
    if (message.serverAddressByClientCIDRs) {
      obj.serverAddressByClientCIDRs = message.serverAddressByClientCIDRs.map(
        (e) => (e ? ServerAddressByClientCIDR.toJSON(e) : undefined)
      );
    } else {
      obj.serverAddressByClientCIDRs = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<APIGroup>, I>>(object: I): APIGroup {
    const message = createBaseAPIGroup();
    message.name = object.name ?? "";
    message.versions =
      object.versions?.map((e) => GroupVersionForDiscovery.fromPartial(e)) ||
      [];
    message.preferredVersion =
      object.preferredVersion !== undefined && object.preferredVersion !== null
        ? GroupVersionForDiscovery.fromPartial(object.preferredVersion)
        : undefined;
    message.serverAddressByClientCIDRs =
      object.serverAddressByClientCIDRs?.map((e) =>
        ServerAddressByClientCIDR.fromPartial(e)
      ) || [];
    return message;
  },
};

function createBaseAPIGroupList(): APIGroupList {
  return { groups: [] };
}

export const APIGroupList = {
  encode(
    message: APIGroupList,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.groups) {
      APIGroup.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): APIGroupList {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAPIGroupList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.groups.push(APIGroup.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): APIGroupList {
    return {
      groups: Array.isArray(object?.groups)
        ? object.groups.map((e: any) => APIGroup.fromJSON(e))
        : [],
    };
  },

  toJSON(message: APIGroupList): unknown {
    const obj: any = {};
    if (message.groups) {
      obj.groups = message.groups.map((e) =>
        e ? APIGroup.toJSON(e) : undefined
      );
    } else {
      obj.groups = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<APIGroupList>, I>>(
    object: I
  ): APIGroupList {
    const message = createBaseAPIGroupList();
    message.groups = object.groups?.map((e) => APIGroup.fromPartial(e)) || [];
    return message;
  },
};

function createBaseAPIResource(): APIResource {
  return {
    name: "",
    singularName: "",
    namespaced: false,
    group: "",
    version: "",
    kind: "",
    verbs: undefined,
    shortNames: [],
    categories: [],
    storageVersionHash: "",
  };
}

export const APIResource = {
  encode(
    message: APIResource,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.singularName !== "") {
      writer.uint32(50).string(message.singularName);
    }
    if (message.namespaced === true) {
      writer.uint32(16).bool(message.namespaced);
    }
    if (message.group !== "") {
      writer.uint32(66).string(message.group);
    }
    if (message.version !== "") {
      writer.uint32(74).string(message.version);
    }
    if (message.kind !== "") {
      writer.uint32(26).string(message.kind);
    }
    if (message.verbs !== undefined) {
      Verbs.encode(message.verbs, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.shortNames) {
      writer.uint32(42).string(v!);
    }
    for (const v of message.categories) {
      writer.uint32(58).string(v!);
    }
    if (message.storageVersionHash !== "") {
      writer.uint32(82).string(message.storageVersionHash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): APIResource {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAPIResource();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 6:
          message.singularName = reader.string();
          break;
        case 2:
          message.namespaced = reader.bool();
          break;
        case 8:
          message.group = reader.string();
          break;
        case 9:
          message.version = reader.string();
          break;
        case 3:
          message.kind = reader.string();
          break;
        case 4:
          message.verbs = Verbs.decode(reader, reader.uint32());
          break;
        case 5:
          message.shortNames.push(reader.string());
          break;
        case 7:
          message.categories.push(reader.string());
          break;
        case 10:
          message.storageVersionHash = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): APIResource {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      singularName: isSet(object.singularName)
        ? String(object.singularName)
        : "",
      namespaced: isSet(object.namespaced) ? Boolean(object.namespaced) : false,
      group: isSet(object.group) ? String(object.group) : "",
      version: isSet(object.version) ? String(object.version) : "",
      kind: isSet(object.kind) ? String(object.kind) : "",
      verbs: isSet(object.verbs) ? Verbs.fromJSON(object.verbs) : undefined,
      shortNames: Array.isArray(object?.shortNames)
        ? object.shortNames.map((e: any) => String(e))
        : [],
      categories: Array.isArray(object?.categories)
        ? object.categories.map((e: any) => String(e))
        : [],
      storageVersionHash: isSet(object.storageVersionHash)
        ? String(object.storageVersionHash)
        : "",
    };
  },

  toJSON(message: APIResource): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.singularName !== undefined &&
      (obj.singularName = message.singularName);
    message.namespaced !== undefined && (obj.namespaced = message.namespaced);
    message.group !== undefined && (obj.group = message.group);
    message.version !== undefined && (obj.version = message.version);
    message.kind !== undefined && (obj.kind = message.kind);
    message.verbs !== undefined &&
      (obj.verbs = message.verbs ? Verbs.toJSON(message.verbs) : undefined);
    if (message.shortNames) {
      obj.shortNames = message.shortNames.map((e) => e);
    } else {
      obj.shortNames = [];
    }
    if (message.categories) {
      obj.categories = message.categories.map((e) => e);
    } else {
      obj.categories = [];
    }
    message.storageVersionHash !== undefined &&
      (obj.storageVersionHash = message.storageVersionHash);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<APIResource>, I>>(
    object: I
  ): APIResource {
    const message = createBaseAPIResource();
    message.name = object.name ?? "";
    message.singularName = object.singularName ?? "";
    message.namespaced = object.namespaced ?? false;
    message.group = object.group ?? "";
    message.version = object.version ?? "";
    message.kind = object.kind ?? "";
    message.verbs =
      object.verbs !== undefined && object.verbs !== null
        ? Verbs.fromPartial(object.verbs)
        : undefined;
    message.shortNames = object.shortNames?.map((e) => e) || [];
    message.categories = object.categories?.map((e) => e) || [];
    message.storageVersionHash = object.storageVersionHash ?? "";
    return message;
  },
};

function createBaseAPIResourceList(): APIResourceList {
  return { groupVersion: "", resources: [] };
}

export const APIResourceList = {
  encode(
    message: APIResourceList,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.groupVersion !== "") {
      writer.uint32(10).string(message.groupVersion);
    }
    for (const v of message.resources) {
      APIResource.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): APIResourceList {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAPIResourceList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.groupVersion = reader.string();
          break;
        case 2:
          message.resources.push(APIResource.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): APIResourceList {
    return {
      groupVersion: isSet(object.groupVersion)
        ? String(object.groupVersion)
        : "",
      resources: Array.isArray(object?.resources)
        ? object.resources.map((e: any) => APIResource.fromJSON(e))
        : [],
    };
  },

  toJSON(message: APIResourceList): unknown {
    const obj: any = {};
    message.groupVersion !== undefined &&
      (obj.groupVersion = message.groupVersion);
    if (message.resources) {
      obj.resources = message.resources.map((e) =>
        e ? APIResource.toJSON(e) : undefined
      );
    } else {
      obj.resources = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<APIResourceList>, I>>(
    object: I
  ): APIResourceList {
    const message = createBaseAPIResourceList();
    message.groupVersion = object.groupVersion ?? "";
    message.resources =
      object.resources?.map((e) => APIResource.fromPartial(e)) || [];
    return message;
  },
};

function createBaseAPIVersions(): APIVersions {
  return { versions: [], serverAddressByClientCIDRs: [] };
}

export const APIVersions = {
  encode(
    message: APIVersions,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.versions) {
      writer.uint32(10).string(v!);
    }
    for (const v of message.serverAddressByClientCIDRs) {
      ServerAddressByClientCIDR.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): APIVersions {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAPIVersions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.versions.push(reader.string());
          break;
        case 2:
          message.serverAddressByClientCIDRs.push(
            ServerAddressByClientCIDR.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): APIVersions {
    return {
      versions: Array.isArray(object?.versions)
        ? object.versions.map((e: any) => String(e))
        : [],
      serverAddressByClientCIDRs: Array.isArray(
        object?.serverAddressByClientCIDRs
      )
        ? object.serverAddressByClientCIDRs.map((e: any) =>
            ServerAddressByClientCIDR.fromJSON(e)
          )
        : [],
    };
  },

  toJSON(message: APIVersions): unknown {
    const obj: any = {};
    if (message.versions) {
      obj.versions = message.versions.map((e) => e);
    } else {
      obj.versions = [];
    }
    if (message.serverAddressByClientCIDRs) {
      obj.serverAddressByClientCIDRs = message.serverAddressByClientCIDRs.map(
        (e) => (e ? ServerAddressByClientCIDR.toJSON(e) : undefined)
      );
    } else {
      obj.serverAddressByClientCIDRs = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<APIVersions>, I>>(
    object: I
  ): APIVersions {
    const message = createBaseAPIVersions();
    message.versions = object.versions?.map((e) => e) || [];
    message.serverAddressByClientCIDRs =
      object.serverAddressByClientCIDRs?.map((e) =>
        ServerAddressByClientCIDR.fromPartial(e)
      ) || [];
    return message;
  },
};

function createBaseApplyOptions(): ApplyOptions {
  return { dryRun: [], force: false, fieldManager: "" };
}

export const ApplyOptions = {
  encode(
    message: ApplyOptions,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.dryRun) {
      writer.uint32(10).string(v!);
    }
    if (message.force === true) {
      writer.uint32(16).bool(message.force);
    }
    if (message.fieldManager !== "") {
      writer.uint32(26).string(message.fieldManager);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ApplyOptions {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseApplyOptions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.dryRun.push(reader.string());
          break;
        case 2:
          message.force = reader.bool();
          break;
        case 3:
          message.fieldManager = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ApplyOptions {
    return {
      dryRun: Array.isArray(object?.dryRun)
        ? object.dryRun.map((e: any) => String(e))
        : [],
      force: isSet(object.force) ? Boolean(object.force) : false,
      fieldManager: isSet(object.fieldManager)
        ? String(object.fieldManager)
        : "",
    };
  },

  toJSON(message: ApplyOptions): unknown {
    const obj: any = {};
    if (message.dryRun) {
      obj.dryRun = message.dryRun.map((e) => e);
    } else {
      obj.dryRun = [];
    }
    message.force !== undefined && (obj.force = message.force);
    message.fieldManager !== undefined &&
      (obj.fieldManager = message.fieldManager);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ApplyOptions>, I>>(
    object: I
  ): ApplyOptions {
    const message = createBaseApplyOptions();
    message.dryRun = object.dryRun?.map((e) => e) || [];
    message.force = object.force ?? false;
    message.fieldManager = object.fieldManager ?? "";
    return message;
  },
};

function createBaseCondition(): Condition {
  return {
    type: "",
    status: "",
    observedGeneration: 0,
    lastTransitionTime: undefined,
    reason: "",
    message: "",
  };
}

export const Condition = {
  encode(
    message: Condition,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.type !== "") {
      writer.uint32(10).string(message.type);
    }
    if (message.status !== "") {
      writer.uint32(18).string(message.status);
    }
    if (message.observedGeneration !== 0) {
      writer.uint32(24).int64(message.observedGeneration);
    }
    if (message.lastTransitionTime !== undefined) {
      Time.encode(
        message.lastTransitionTime,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.reason !== "") {
      writer.uint32(42).string(message.reason);
    }
    if (message.message !== "") {
      writer.uint32(50).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Condition {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCondition();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.string();
          break;
        case 2:
          message.status = reader.string();
          break;
        case 3:
          message.observedGeneration = longToNumber(reader.int64() as Long);
          break;
        case 4:
          message.lastTransitionTime = Time.decode(reader, reader.uint32());
          break;
        case 5:
          message.reason = reader.string();
          break;
        case 6:
          message.message = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Condition {
    return {
      type: isSet(object.type) ? String(object.type) : "",
      status: isSet(object.status) ? String(object.status) : "",
      observedGeneration: isSet(object.observedGeneration)
        ? Number(object.observedGeneration)
        : 0,
      lastTransitionTime: isSet(object.lastTransitionTime)
        ? Time.fromJSON(object.lastTransitionTime)
        : undefined,
      reason: isSet(object.reason) ? String(object.reason) : "",
      message: isSet(object.message) ? String(object.message) : "",
    };
  },

  toJSON(message: Condition): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = message.type);
    message.status !== undefined && (obj.status = message.status);
    message.observedGeneration !== undefined &&
      (obj.observedGeneration = Math.round(message.observedGeneration));
    message.lastTransitionTime !== undefined &&
      (obj.lastTransitionTime = message.lastTransitionTime
        ? Time.toJSON(message.lastTransitionTime)
        : undefined);
    message.reason !== undefined && (obj.reason = message.reason);
    message.message !== undefined && (obj.message = message.message);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Condition>, I>>(
    object: I
  ): Condition {
    const message = createBaseCondition();
    message.type = object.type ?? "";
    message.status = object.status ?? "";
    message.observedGeneration = object.observedGeneration ?? 0;
    message.lastTransitionTime =
      object.lastTransitionTime !== undefined &&
      object.lastTransitionTime !== null
        ? Time.fromPartial(object.lastTransitionTime)
        : undefined;
    message.reason = object.reason ?? "";
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseCreateOptions(): CreateOptions {
  return { dryRun: [], fieldManager: "" };
}

export const CreateOptions = {
  encode(
    message: CreateOptions,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.dryRun) {
      writer.uint32(10).string(v!);
    }
    if (message.fieldManager !== "") {
      writer.uint32(26).string(message.fieldManager);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateOptions {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateOptions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.dryRun.push(reader.string());
          break;
        case 3:
          message.fieldManager = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateOptions {
    return {
      dryRun: Array.isArray(object?.dryRun)
        ? object.dryRun.map((e: any) => String(e))
        : [],
      fieldManager: isSet(object.fieldManager)
        ? String(object.fieldManager)
        : "",
    };
  },

  toJSON(message: CreateOptions): unknown {
    const obj: any = {};
    if (message.dryRun) {
      obj.dryRun = message.dryRun.map((e) => e);
    } else {
      obj.dryRun = [];
    }
    message.fieldManager !== undefined &&
      (obj.fieldManager = message.fieldManager);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateOptions>, I>>(
    object: I
  ): CreateOptions {
    const message = createBaseCreateOptions();
    message.dryRun = object.dryRun?.map((e) => e) || [];
    message.fieldManager = object.fieldManager ?? "";
    return message;
  },
};

function createBaseDeleteOptions(): DeleteOptions {
  return {
    gracePeriodSeconds: 0,
    preconditions: undefined,
    orphanDependents: false,
    propagationPolicy: "",
    dryRun: [],
  };
}

export const DeleteOptions = {
  encode(
    message: DeleteOptions,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.gracePeriodSeconds !== 0) {
      writer.uint32(8).int64(message.gracePeriodSeconds);
    }
    if (message.preconditions !== undefined) {
      Preconditions.encode(
        message.preconditions,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.orphanDependents === true) {
      writer.uint32(24).bool(message.orphanDependents);
    }
    if (message.propagationPolicy !== "") {
      writer.uint32(34).string(message.propagationPolicy);
    }
    for (const v of message.dryRun) {
      writer.uint32(42).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteOptions {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteOptions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.gracePeriodSeconds = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.preconditions = Preconditions.decode(reader, reader.uint32());
          break;
        case 3:
          message.orphanDependents = reader.bool();
          break;
        case 4:
          message.propagationPolicy = reader.string();
          break;
        case 5:
          message.dryRun.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteOptions {
    return {
      gracePeriodSeconds: isSet(object.gracePeriodSeconds)
        ? Number(object.gracePeriodSeconds)
        : 0,
      preconditions: isSet(object.preconditions)
        ? Preconditions.fromJSON(object.preconditions)
        : undefined,
      orphanDependents: isSet(object.orphanDependents)
        ? Boolean(object.orphanDependents)
        : false,
      propagationPolicy: isSet(object.propagationPolicy)
        ? String(object.propagationPolicy)
        : "",
      dryRun: Array.isArray(object?.dryRun)
        ? object.dryRun.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: DeleteOptions): unknown {
    const obj: any = {};
    message.gracePeriodSeconds !== undefined &&
      (obj.gracePeriodSeconds = Math.round(message.gracePeriodSeconds));
    message.preconditions !== undefined &&
      (obj.preconditions = message.preconditions
        ? Preconditions.toJSON(message.preconditions)
        : undefined);
    message.orphanDependents !== undefined &&
      (obj.orphanDependents = message.orphanDependents);
    message.propagationPolicy !== undefined &&
      (obj.propagationPolicy = message.propagationPolicy);
    if (message.dryRun) {
      obj.dryRun = message.dryRun.map((e) => e);
    } else {
      obj.dryRun = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DeleteOptions>, I>>(
    object: I
  ): DeleteOptions {
    const message = createBaseDeleteOptions();
    message.gracePeriodSeconds = object.gracePeriodSeconds ?? 0;
    message.preconditions =
      object.preconditions !== undefined && object.preconditions !== null
        ? Preconditions.fromPartial(object.preconditions)
        : undefined;
    message.orphanDependents = object.orphanDependents ?? false;
    message.propagationPolicy = object.propagationPolicy ?? "";
    message.dryRun = object.dryRun?.map((e) => e) || [];
    return message;
  },
};

function createBaseDuration(): Duration {
  return { duration: 0 };
}

export const Duration = {
  encode(
    message: Duration,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.duration !== 0) {
      writer.uint32(8).int64(message.duration);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Duration {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDuration();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.duration = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Duration {
    return {
      duration: isSet(object.duration) ? Number(object.duration) : 0,
    };
  },

  toJSON(message: Duration): unknown {
    const obj: any = {};
    message.duration !== undefined &&
      (obj.duration = Math.round(message.duration));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Duration>, I>>(object: I): Duration {
    const message = createBaseDuration();
    message.duration = object.duration ?? 0;
    return message;
  },
};

function createBaseFieldsV1(): FieldsV1 {
  return { Raw: new Uint8Array() };
}

export const FieldsV1 = {
  encode(
    message: FieldsV1,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.Raw.length !== 0) {
      writer.uint32(10).bytes(message.Raw);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FieldsV1 {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFieldsV1();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Raw = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FieldsV1 {
    return {
      Raw: isSet(object.Raw) ? bytesFromBase64(object.Raw) : new Uint8Array(),
    };
  },

  toJSON(message: FieldsV1): unknown {
    const obj: any = {};
    message.Raw !== undefined &&
      (obj.Raw = base64FromBytes(
        message.Raw !== undefined ? message.Raw : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<FieldsV1>, I>>(object: I): FieldsV1 {
    const message = createBaseFieldsV1();
    message.Raw = object.Raw ?? new Uint8Array();
    return message;
  },
};

function createBaseGetOptions(): GetOptions {
  return { resourceVersion: "" };
}

export const GetOptions = {
  encode(
    message: GetOptions,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.resourceVersion !== "") {
      writer.uint32(10).string(message.resourceVersion);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetOptions {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetOptions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.resourceVersion = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetOptions {
    return {
      resourceVersion: isSet(object.resourceVersion)
        ? String(object.resourceVersion)
        : "",
    };
  },

  toJSON(message: GetOptions): unknown {
    const obj: any = {};
    message.resourceVersion !== undefined &&
      (obj.resourceVersion = message.resourceVersion);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetOptions>, I>>(
    object: I
  ): GetOptions {
    const message = createBaseGetOptions();
    message.resourceVersion = object.resourceVersion ?? "";
    return message;
  },
};

function createBaseGroupKind(): GroupKind {
  return { group: "", kind: "" };
}

export const GroupKind = {
  encode(
    message: GroupKind,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.group !== "") {
      writer.uint32(10).string(message.group);
    }
    if (message.kind !== "") {
      writer.uint32(18).string(message.kind);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GroupKind {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGroupKind();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.group = reader.string();
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

  fromJSON(object: any): GroupKind {
    return {
      group: isSet(object.group) ? String(object.group) : "",
      kind: isSet(object.kind) ? String(object.kind) : "",
    };
  },

  toJSON(message: GroupKind): unknown {
    const obj: any = {};
    message.group !== undefined && (obj.group = message.group);
    message.kind !== undefined && (obj.kind = message.kind);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GroupKind>, I>>(
    object: I
  ): GroupKind {
    const message = createBaseGroupKind();
    message.group = object.group ?? "";
    message.kind = object.kind ?? "";
    return message;
  },
};

function createBaseGroupResource(): GroupResource {
  return { group: "", resource: "" };
}

export const GroupResource = {
  encode(
    message: GroupResource,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.group !== "") {
      writer.uint32(10).string(message.group);
    }
    if (message.resource !== "") {
      writer.uint32(18).string(message.resource);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GroupResource {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGroupResource();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.group = reader.string();
          break;
        case 2:
          message.resource = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GroupResource {
    return {
      group: isSet(object.group) ? String(object.group) : "",
      resource: isSet(object.resource) ? String(object.resource) : "",
    };
  },

  toJSON(message: GroupResource): unknown {
    const obj: any = {};
    message.group !== undefined && (obj.group = message.group);
    message.resource !== undefined && (obj.resource = message.resource);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GroupResource>, I>>(
    object: I
  ): GroupResource {
    const message = createBaseGroupResource();
    message.group = object.group ?? "";
    message.resource = object.resource ?? "";
    return message;
  },
};

function createBaseGroupVersion(): GroupVersion {
  return { group: "", version: "" };
}

export const GroupVersion = {
  encode(
    message: GroupVersion,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.group !== "") {
      writer.uint32(10).string(message.group);
    }
    if (message.version !== "") {
      writer.uint32(18).string(message.version);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GroupVersion {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGroupVersion();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.group = reader.string();
          break;
        case 2:
          message.version = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GroupVersion {
    return {
      group: isSet(object.group) ? String(object.group) : "",
      version: isSet(object.version) ? String(object.version) : "",
    };
  },

  toJSON(message: GroupVersion): unknown {
    const obj: any = {};
    message.group !== undefined && (obj.group = message.group);
    message.version !== undefined && (obj.version = message.version);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GroupVersion>, I>>(
    object: I
  ): GroupVersion {
    const message = createBaseGroupVersion();
    message.group = object.group ?? "";
    message.version = object.version ?? "";
    return message;
  },
};

function createBaseGroupVersionForDiscovery(): GroupVersionForDiscovery {
  return { groupVersion: "", version: "" };
}

export const GroupVersionForDiscovery = {
  encode(
    message: GroupVersionForDiscovery,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.groupVersion !== "") {
      writer.uint32(10).string(message.groupVersion);
    }
    if (message.version !== "") {
      writer.uint32(18).string(message.version);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GroupVersionForDiscovery {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGroupVersionForDiscovery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.groupVersion = reader.string();
          break;
        case 2:
          message.version = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GroupVersionForDiscovery {
    return {
      groupVersion: isSet(object.groupVersion)
        ? String(object.groupVersion)
        : "",
      version: isSet(object.version) ? String(object.version) : "",
    };
  },

  toJSON(message: GroupVersionForDiscovery): unknown {
    const obj: any = {};
    message.groupVersion !== undefined &&
      (obj.groupVersion = message.groupVersion);
    message.version !== undefined && (obj.version = message.version);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GroupVersionForDiscovery>, I>>(
    object: I
  ): GroupVersionForDiscovery {
    const message = createBaseGroupVersionForDiscovery();
    message.groupVersion = object.groupVersion ?? "";
    message.version = object.version ?? "";
    return message;
  },
};

function createBaseGroupVersionKind(): GroupVersionKind {
  return { group: "", version: "", kind: "" };
}

export const GroupVersionKind = {
  encode(
    message: GroupVersionKind,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.group !== "") {
      writer.uint32(10).string(message.group);
    }
    if (message.version !== "") {
      writer.uint32(18).string(message.version);
    }
    if (message.kind !== "") {
      writer.uint32(26).string(message.kind);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GroupVersionKind {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGroupVersionKind();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.group = reader.string();
          break;
        case 2:
          message.version = reader.string();
          break;
        case 3:
          message.kind = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GroupVersionKind {
    return {
      group: isSet(object.group) ? String(object.group) : "",
      version: isSet(object.version) ? String(object.version) : "",
      kind: isSet(object.kind) ? String(object.kind) : "",
    };
  },

  toJSON(message: GroupVersionKind): unknown {
    const obj: any = {};
    message.group !== undefined && (obj.group = message.group);
    message.version !== undefined && (obj.version = message.version);
    message.kind !== undefined && (obj.kind = message.kind);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GroupVersionKind>, I>>(
    object: I
  ): GroupVersionKind {
    const message = createBaseGroupVersionKind();
    message.group = object.group ?? "";
    message.version = object.version ?? "";
    message.kind = object.kind ?? "";
    return message;
  },
};

function createBaseGroupVersionResource(): GroupVersionResource {
  return { group: "", version: "", resource: "" };
}

export const GroupVersionResource = {
  encode(
    message: GroupVersionResource,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.group !== "") {
      writer.uint32(10).string(message.group);
    }
    if (message.version !== "") {
      writer.uint32(18).string(message.version);
    }
    if (message.resource !== "") {
      writer.uint32(26).string(message.resource);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GroupVersionResource {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGroupVersionResource();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.group = reader.string();
          break;
        case 2:
          message.version = reader.string();
          break;
        case 3:
          message.resource = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GroupVersionResource {
    return {
      group: isSet(object.group) ? String(object.group) : "",
      version: isSet(object.version) ? String(object.version) : "",
      resource: isSet(object.resource) ? String(object.resource) : "",
    };
  },

  toJSON(message: GroupVersionResource): unknown {
    const obj: any = {};
    message.group !== undefined && (obj.group = message.group);
    message.version !== undefined && (obj.version = message.version);
    message.resource !== undefined && (obj.resource = message.resource);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GroupVersionResource>, I>>(
    object: I
  ): GroupVersionResource {
    const message = createBaseGroupVersionResource();
    message.group = object.group ?? "";
    message.version = object.version ?? "";
    message.resource = object.resource ?? "";
    return message;
  },
};

function createBaseLabelSelector(): LabelSelector {
  return { matchLabels: {}, matchExpressions: [] };
}

export const LabelSelector = {
  encode(
    message: LabelSelector,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    Object.entries(message.matchLabels).forEach(([key, value]) => {
      LabelSelector_MatchLabelsEntry.encode(
        { key: key as any, value },
        writer.uint32(10).fork()
      ).ldelim();
    });
    for (const v of message.matchExpressions) {
      LabelSelectorRequirement.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LabelSelector {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLabelSelector();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          const entry1 = LabelSelector_MatchLabelsEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry1.value !== undefined) {
            message.matchLabels[entry1.key] = entry1.value;
          }
          break;
        case 2:
          message.matchExpressions.push(
            LabelSelectorRequirement.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LabelSelector {
    return {
      matchLabels: isObject(object.matchLabels)
        ? Object.entries(object.matchLabels).reduce<{ [key: string]: string }>(
            (acc, [key, value]) => {
              acc[key] = String(value);
              return acc;
            },
            {}
          )
        : {},
      matchExpressions: Array.isArray(object?.matchExpressions)
        ? object.matchExpressions.map((e: any) =>
            LabelSelectorRequirement.fromJSON(e)
          )
        : [],
    };
  },

  toJSON(message: LabelSelector): unknown {
    const obj: any = {};
    obj.matchLabels = {};
    if (message.matchLabels) {
      Object.entries(message.matchLabels).forEach(([k, v]) => {
        obj.matchLabels[k] = v;
      });
    }
    if (message.matchExpressions) {
      obj.matchExpressions = message.matchExpressions.map((e) =>
        e ? LabelSelectorRequirement.toJSON(e) : undefined
      );
    } else {
      obj.matchExpressions = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LabelSelector>, I>>(
    object: I
  ): LabelSelector {
    const message = createBaseLabelSelector();
    message.matchLabels = Object.entries(object.matchLabels ?? {}).reduce<{
      [key: string]: string;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    message.matchExpressions =
      object.matchExpressions?.map((e) =>
        LabelSelectorRequirement.fromPartial(e)
      ) || [];
    return message;
  },
};

function createBaseLabelSelector_MatchLabelsEntry(): LabelSelector_MatchLabelsEntry {
  return { key: "", value: "" };
}

export const LabelSelector_MatchLabelsEntry = {
  encode(
    message: LabelSelector_MatchLabelsEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): LabelSelector_MatchLabelsEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLabelSelector_MatchLabelsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LabelSelector_MatchLabelsEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? String(object.value) : "",
    };
  },

  toJSON(message: LabelSelector_MatchLabelsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LabelSelector_MatchLabelsEntry>, I>>(
    object: I
  ): LabelSelector_MatchLabelsEntry {
    const message = createBaseLabelSelector_MatchLabelsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseLabelSelectorRequirement(): LabelSelectorRequirement {
  return { key: "", operator: "", values: [] };
}

export const LabelSelectorRequirement = {
  encode(
    message: LabelSelectorRequirement,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.operator !== "") {
      writer.uint32(18).string(message.operator);
    }
    for (const v of message.values) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): LabelSelectorRequirement {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLabelSelectorRequirement();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.operator = reader.string();
          break;
        case 3:
          message.values.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LabelSelectorRequirement {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      operator: isSet(object.operator) ? String(object.operator) : "",
      values: Array.isArray(object?.values)
        ? object.values.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: LabelSelectorRequirement): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.operator !== undefined && (obj.operator = message.operator);
    if (message.values) {
      obj.values = message.values.map((e) => e);
    } else {
      obj.values = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LabelSelectorRequirement>, I>>(
    object: I
  ): LabelSelectorRequirement {
    const message = createBaseLabelSelectorRequirement();
    message.key = object.key ?? "";
    message.operator = object.operator ?? "";
    message.values = object.values?.map((e) => e) || [];
    return message;
  },
};

function createBaseList(): List {
  return { metadata: undefined, items: [] };
}

export const List = {
  encode(message: List, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.metadata !== undefined) {
      ListMeta.encode(message.metadata, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.items) {
      RawExtension.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): List {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.metadata = ListMeta.decode(reader, reader.uint32());
          break;
        case 2:
          message.items.push(RawExtension.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): List {
    return {
      metadata: isSet(object.metadata)
        ? ListMeta.fromJSON(object.metadata)
        : undefined,
      items: Array.isArray(object?.items)
        ? object.items.map((e: any) => RawExtension.fromJSON(e))
        : [],
    };
  },

  toJSON(message: List): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? ListMeta.toJSON(message.metadata)
        : undefined);
    if (message.items) {
      obj.items = message.items.map((e) =>
        e ? RawExtension.toJSON(e) : undefined
      );
    } else {
      obj.items = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<List>, I>>(object: I): List {
    const message = createBaseList();
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? ListMeta.fromPartial(object.metadata)
        : undefined;
    message.items = object.items?.map((e) => RawExtension.fromPartial(e)) || [];
    return message;
  },
};

function createBaseListMeta(): ListMeta {
  return {
    selfLink: "",
    resourceVersion: "",
    continue: "",
    remainingItemCount: 0,
  };
}

export const ListMeta = {
  encode(
    message: ListMeta,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.selfLink !== "") {
      writer.uint32(10).string(message.selfLink);
    }
    if (message.resourceVersion !== "") {
      writer.uint32(18).string(message.resourceVersion);
    }
    if (message.continue !== "") {
      writer.uint32(26).string(message.continue);
    }
    if (message.remainingItemCount !== 0) {
      writer.uint32(32).int64(message.remainingItemCount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListMeta {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListMeta();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.selfLink = reader.string();
          break;
        case 2:
          message.resourceVersion = reader.string();
          break;
        case 3:
          message.continue = reader.string();
          break;
        case 4:
          message.remainingItemCount = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListMeta {
    return {
      selfLink: isSet(object.selfLink) ? String(object.selfLink) : "",
      resourceVersion: isSet(object.resourceVersion)
        ? String(object.resourceVersion)
        : "",
      continue: isSet(object.continue) ? String(object.continue) : "",
      remainingItemCount: isSet(object.remainingItemCount)
        ? Number(object.remainingItemCount)
        : 0,
    };
  },

  toJSON(message: ListMeta): unknown {
    const obj: any = {};
    message.selfLink !== undefined && (obj.selfLink = message.selfLink);
    message.resourceVersion !== undefined &&
      (obj.resourceVersion = message.resourceVersion);
    message.continue !== undefined && (obj.continue = message.continue);
    message.remainingItemCount !== undefined &&
      (obj.remainingItemCount = Math.round(message.remainingItemCount));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListMeta>, I>>(object: I): ListMeta {
    const message = createBaseListMeta();
    message.selfLink = object.selfLink ?? "";
    message.resourceVersion = object.resourceVersion ?? "";
    message.continue = object.continue ?? "";
    message.remainingItemCount = object.remainingItemCount ?? 0;
    return message;
  },
};

function createBaseListOptions(): ListOptions {
  return {
    labelSelector: "",
    fieldSelector: "",
    watch: false,
    allowWatchBookmarks: false,
    resourceVersion: "",
    resourceVersionMatch: "",
    timeoutSeconds: 0,
    limit: 0,
    continue: "",
  };
}

export const ListOptions = {
  encode(
    message: ListOptions,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.labelSelector !== "") {
      writer.uint32(10).string(message.labelSelector);
    }
    if (message.fieldSelector !== "") {
      writer.uint32(18).string(message.fieldSelector);
    }
    if (message.watch === true) {
      writer.uint32(24).bool(message.watch);
    }
    if (message.allowWatchBookmarks === true) {
      writer.uint32(72).bool(message.allowWatchBookmarks);
    }
    if (message.resourceVersion !== "") {
      writer.uint32(34).string(message.resourceVersion);
    }
    if (message.resourceVersionMatch !== "") {
      writer.uint32(82).string(message.resourceVersionMatch);
    }
    if (message.timeoutSeconds !== 0) {
      writer.uint32(40).int64(message.timeoutSeconds);
    }
    if (message.limit !== 0) {
      writer.uint32(56).int64(message.limit);
    }
    if (message.continue !== "") {
      writer.uint32(66).string(message.continue);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListOptions {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListOptions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.labelSelector = reader.string();
          break;
        case 2:
          message.fieldSelector = reader.string();
          break;
        case 3:
          message.watch = reader.bool();
          break;
        case 9:
          message.allowWatchBookmarks = reader.bool();
          break;
        case 4:
          message.resourceVersion = reader.string();
          break;
        case 10:
          message.resourceVersionMatch = reader.string();
          break;
        case 5:
          message.timeoutSeconds = longToNumber(reader.int64() as Long);
          break;
        case 7:
          message.limit = longToNumber(reader.int64() as Long);
          break;
        case 8:
          message.continue = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListOptions {
    return {
      labelSelector: isSet(object.labelSelector)
        ? String(object.labelSelector)
        : "",
      fieldSelector: isSet(object.fieldSelector)
        ? String(object.fieldSelector)
        : "",
      watch: isSet(object.watch) ? Boolean(object.watch) : false,
      allowWatchBookmarks: isSet(object.allowWatchBookmarks)
        ? Boolean(object.allowWatchBookmarks)
        : false,
      resourceVersion: isSet(object.resourceVersion)
        ? String(object.resourceVersion)
        : "",
      resourceVersionMatch: isSet(object.resourceVersionMatch)
        ? String(object.resourceVersionMatch)
        : "",
      timeoutSeconds: isSet(object.timeoutSeconds)
        ? Number(object.timeoutSeconds)
        : 0,
      limit: isSet(object.limit) ? Number(object.limit) : 0,
      continue: isSet(object.continue) ? String(object.continue) : "",
    };
  },

  toJSON(message: ListOptions): unknown {
    const obj: any = {};
    message.labelSelector !== undefined &&
      (obj.labelSelector = message.labelSelector);
    message.fieldSelector !== undefined &&
      (obj.fieldSelector = message.fieldSelector);
    message.watch !== undefined && (obj.watch = message.watch);
    message.allowWatchBookmarks !== undefined &&
      (obj.allowWatchBookmarks = message.allowWatchBookmarks);
    message.resourceVersion !== undefined &&
      (obj.resourceVersion = message.resourceVersion);
    message.resourceVersionMatch !== undefined &&
      (obj.resourceVersionMatch = message.resourceVersionMatch);
    message.timeoutSeconds !== undefined &&
      (obj.timeoutSeconds = Math.round(message.timeoutSeconds));
    message.limit !== undefined && (obj.limit = Math.round(message.limit));
    message.continue !== undefined && (obj.continue = message.continue);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListOptions>, I>>(
    object: I
  ): ListOptions {
    const message = createBaseListOptions();
    message.labelSelector = object.labelSelector ?? "";
    message.fieldSelector = object.fieldSelector ?? "";
    message.watch = object.watch ?? false;
    message.allowWatchBookmarks = object.allowWatchBookmarks ?? false;
    message.resourceVersion = object.resourceVersion ?? "";
    message.resourceVersionMatch = object.resourceVersionMatch ?? "";
    message.timeoutSeconds = object.timeoutSeconds ?? 0;
    message.limit = object.limit ?? 0;
    message.continue = object.continue ?? "";
    return message;
  },
};

function createBaseManagedFieldsEntry(): ManagedFieldsEntry {
  return {
    manager: "",
    operation: "",
    apiVersion: "",
    time: undefined,
    fieldsType: "",
    fieldsV1: undefined,
    subresource: "",
  };
}

export const ManagedFieldsEntry = {
  encode(
    message: ManagedFieldsEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.manager !== "") {
      writer.uint32(10).string(message.manager);
    }
    if (message.operation !== "") {
      writer.uint32(18).string(message.operation);
    }
    if (message.apiVersion !== "") {
      writer.uint32(26).string(message.apiVersion);
    }
    if (message.time !== undefined) {
      Time.encode(message.time, writer.uint32(34).fork()).ldelim();
    }
    if (message.fieldsType !== "") {
      writer.uint32(50).string(message.fieldsType);
    }
    if (message.fieldsV1 !== undefined) {
      FieldsV1.encode(message.fieldsV1, writer.uint32(58).fork()).ldelim();
    }
    if (message.subresource !== "") {
      writer.uint32(66).string(message.subresource);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ManagedFieldsEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseManagedFieldsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.manager = reader.string();
          break;
        case 2:
          message.operation = reader.string();
          break;
        case 3:
          message.apiVersion = reader.string();
          break;
        case 4:
          message.time = Time.decode(reader, reader.uint32());
          break;
        case 6:
          message.fieldsType = reader.string();
          break;
        case 7:
          message.fieldsV1 = FieldsV1.decode(reader, reader.uint32());
          break;
        case 8:
          message.subresource = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ManagedFieldsEntry {
    return {
      manager: isSet(object.manager) ? String(object.manager) : "",
      operation: isSet(object.operation) ? String(object.operation) : "",
      apiVersion: isSet(object.apiVersion) ? String(object.apiVersion) : "",
      time: isSet(object.time) ? Time.fromJSON(object.time) : undefined,
      fieldsType: isSet(object.fieldsType) ? String(object.fieldsType) : "",
      fieldsV1: isSet(object.fieldsV1)
        ? FieldsV1.fromJSON(object.fieldsV1)
        : undefined,
      subresource: isSet(object.subresource) ? String(object.subresource) : "",
    };
  },

  toJSON(message: ManagedFieldsEntry): unknown {
    const obj: any = {};
    message.manager !== undefined && (obj.manager = message.manager);
    message.operation !== undefined && (obj.operation = message.operation);
    message.apiVersion !== undefined && (obj.apiVersion = message.apiVersion);
    message.time !== undefined &&
      (obj.time = message.time ? Time.toJSON(message.time) : undefined);
    message.fieldsType !== undefined && (obj.fieldsType = message.fieldsType);
    message.fieldsV1 !== undefined &&
      (obj.fieldsV1 = message.fieldsV1
        ? FieldsV1.toJSON(message.fieldsV1)
        : undefined);
    message.subresource !== undefined &&
      (obj.subresource = message.subresource);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ManagedFieldsEntry>, I>>(
    object: I
  ): ManagedFieldsEntry {
    const message = createBaseManagedFieldsEntry();
    message.manager = object.manager ?? "";
    message.operation = object.operation ?? "";
    message.apiVersion = object.apiVersion ?? "";
    message.time =
      object.time !== undefined && object.time !== null
        ? Time.fromPartial(object.time)
        : undefined;
    message.fieldsType = object.fieldsType ?? "";
    message.fieldsV1 =
      object.fieldsV1 !== undefined && object.fieldsV1 !== null
        ? FieldsV1.fromPartial(object.fieldsV1)
        : undefined;
    message.subresource = object.subresource ?? "";
    return message;
  },
};

function createBaseMicroTime(): MicroTime {
  return { seconds: 0, nanos: 0 };
}

export const MicroTime = {
  encode(
    message: MicroTime,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.seconds !== 0) {
      writer.uint32(8).int64(message.seconds);
    }
    if (message.nanos !== 0) {
      writer.uint32(16).int32(message.nanos);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MicroTime {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMicroTime();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.seconds = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.nanos = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MicroTime {
    return {
      seconds: isSet(object.seconds) ? Number(object.seconds) : 0,
      nanos: isSet(object.nanos) ? Number(object.nanos) : 0,
    };
  },

  toJSON(message: MicroTime): unknown {
    const obj: any = {};
    message.seconds !== undefined &&
      (obj.seconds = Math.round(message.seconds));
    message.nanos !== undefined && (obj.nanos = Math.round(message.nanos));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MicroTime>, I>>(
    object: I
  ): MicroTime {
    const message = createBaseMicroTime();
    message.seconds = object.seconds ?? 0;
    message.nanos = object.nanos ?? 0;
    return message;
  },
};

function createBaseObjectMeta(): ObjectMeta {
  return {
    name: "",
    generateName: "",
    namespace: "",
    selfLink: "",
    uid: "",
    resourceVersion: "",
    generation: 0,
    creationTimestamp: undefined,
    deletionTimestamp: undefined,
    deletionGracePeriodSeconds: 0,
    labels: {},
    annotations: {},
    ownerReferences: [],
    finalizers: [],
    clusterName: "",
    managedFields: [],
  };
}

export const ObjectMeta = {
  encode(
    message: ObjectMeta,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.generateName !== "") {
      writer.uint32(18).string(message.generateName);
    }
    if (message.namespace !== "") {
      writer.uint32(26).string(message.namespace);
    }
    if (message.selfLink !== "") {
      writer.uint32(34).string(message.selfLink);
    }
    if (message.uid !== "") {
      writer.uint32(42).string(message.uid);
    }
    if (message.resourceVersion !== "") {
      writer.uint32(50).string(message.resourceVersion);
    }
    if (message.generation !== 0) {
      writer.uint32(56).int64(message.generation);
    }
    if (message.creationTimestamp !== undefined) {
      Time.encode(message.creationTimestamp, writer.uint32(66).fork()).ldelim();
    }
    if (message.deletionTimestamp !== undefined) {
      Time.encode(message.deletionTimestamp, writer.uint32(74).fork()).ldelim();
    }
    if (message.deletionGracePeriodSeconds !== 0) {
      writer.uint32(80).int64(message.deletionGracePeriodSeconds);
    }
    Object.entries(message.labels).forEach(([key, value]) => {
      ObjectMeta_LabelsEntry.encode(
        { key: key as any, value },
        writer.uint32(90).fork()
      ).ldelim();
    });
    Object.entries(message.annotations).forEach(([key, value]) => {
      ObjectMeta_AnnotationsEntry.encode(
        { key: key as any, value },
        writer.uint32(98).fork()
      ).ldelim();
    });
    for (const v of message.ownerReferences) {
      OwnerReference.encode(v!, writer.uint32(106).fork()).ldelim();
    }
    for (const v of message.finalizers) {
      writer.uint32(114).string(v!);
    }
    if (message.clusterName !== "") {
      writer.uint32(122).string(message.clusterName);
    }
    for (const v of message.managedFields) {
      ManagedFieldsEntry.encode(v!, writer.uint32(138).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ObjectMeta {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseObjectMeta();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.generateName = reader.string();
          break;
        case 3:
          message.namespace = reader.string();
          break;
        case 4:
          message.selfLink = reader.string();
          break;
        case 5:
          message.uid = reader.string();
          break;
        case 6:
          message.resourceVersion = reader.string();
          break;
        case 7:
          message.generation = longToNumber(reader.int64() as Long);
          break;
        case 8:
          message.creationTimestamp = Time.decode(reader, reader.uint32());
          break;
        case 9:
          message.deletionTimestamp = Time.decode(reader, reader.uint32());
          break;
        case 10:
          message.deletionGracePeriodSeconds = longToNumber(
            reader.int64() as Long
          );
          break;
        case 11:
          const entry11 = ObjectMeta_LabelsEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry11.value !== undefined) {
            message.labels[entry11.key] = entry11.value;
          }
          break;
        case 12:
          const entry12 = ObjectMeta_AnnotationsEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry12.value !== undefined) {
            message.annotations[entry12.key] = entry12.value;
          }
          break;
        case 13:
          message.ownerReferences.push(
            OwnerReference.decode(reader, reader.uint32())
          );
          break;
        case 14:
          message.finalizers.push(reader.string());
          break;
        case 15:
          message.clusterName = reader.string();
          break;
        case 17:
          message.managedFields.push(
            ManagedFieldsEntry.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ObjectMeta {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      generateName: isSet(object.generateName)
        ? String(object.generateName)
        : "",
      namespace: isSet(object.namespace) ? String(object.namespace) : "",
      selfLink: isSet(object.selfLink) ? String(object.selfLink) : "",
      uid: isSet(object.uid) ? String(object.uid) : "",
      resourceVersion: isSet(object.resourceVersion)
        ? String(object.resourceVersion)
        : "",
      generation: isSet(object.generation) ? Number(object.generation) : 0,
      creationTimestamp: isSet(object.creationTimestamp)
        ? Time.fromJSON(object.creationTimestamp)
        : undefined,
      deletionTimestamp: isSet(object.deletionTimestamp)
        ? Time.fromJSON(object.deletionTimestamp)
        : undefined,
      deletionGracePeriodSeconds: isSet(object.deletionGracePeriodSeconds)
        ? Number(object.deletionGracePeriodSeconds)
        : 0,
      labels: isObject(object.labels)
        ? Object.entries(object.labels).reduce<{ [key: string]: string }>(
            (acc, [key, value]) => {
              acc[key] = String(value);
              return acc;
            },
            {}
          )
        : {},
      annotations: isObject(object.annotations)
        ? Object.entries(object.annotations).reduce<{ [key: string]: string }>(
            (acc, [key, value]) => {
              acc[key] = String(value);
              return acc;
            },
            {}
          )
        : {},
      ownerReferences: Array.isArray(object?.ownerReferences)
        ? object.ownerReferences.map((e: any) => OwnerReference.fromJSON(e))
        : [],
      finalizers: Array.isArray(object?.finalizers)
        ? object.finalizers.map((e: any) => String(e))
        : [],
      clusterName: isSet(object.clusterName) ? String(object.clusterName) : "",
      managedFields: Array.isArray(object?.managedFields)
        ? object.managedFields.map((e: any) => ManagedFieldsEntry.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ObjectMeta): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.generateName !== undefined &&
      (obj.generateName = message.generateName);
    message.namespace !== undefined && (obj.namespace = message.namespace);
    message.selfLink !== undefined && (obj.selfLink = message.selfLink);
    message.uid !== undefined && (obj.uid = message.uid);
    message.resourceVersion !== undefined &&
      (obj.resourceVersion = message.resourceVersion);
    message.generation !== undefined &&
      (obj.generation = Math.round(message.generation));
    message.creationTimestamp !== undefined &&
      (obj.creationTimestamp = message.creationTimestamp
        ? Time.toJSON(message.creationTimestamp)
        : undefined);
    message.deletionTimestamp !== undefined &&
      (obj.deletionTimestamp = message.deletionTimestamp
        ? Time.toJSON(message.deletionTimestamp)
        : undefined);
    message.deletionGracePeriodSeconds !== undefined &&
      (obj.deletionGracePeriodSeconds = Math.round(
        message.deletionGracePeriodSeconds
      ));
    obj.labels = {};
    if (message.labels) {
      Object.entries(message.labels).forEach(([k, v]) => {
        obj.labels[k] = v;
      });
    }
    obj.annotations = {};
    if (message.annotations) {
      Object.entries(message.annotations).forEach(([k, v]) => {
        obj.annotations[k] = v;
      });
    }
    if (message.ownerReferences) {
      obj.ownerReferences = message.ownerReferences.map((e) =>
        e ? OwnerReference.toJSON(e) : undefined
      );
    } else {
      obj.ownerReferences = [];
    }
    if (message.finalizers) {
      obj.finalizers = message.finalizers.map((e) => e);
    } else {
      obj.finalizers = [];
    }
    message.clusterName !== undefined &&
      (obj.clusterName = message.clusterName);
    if (message.managedFields) {
      obj.managedFields = message.managedFields.map((e) =>
        e ? ManagedFieldsEntry.toJSON(e) : undefined
      );
    } else {
      obj.managedFields = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ObjectMeta>, I>>(
    object: I
  ): ObjectMeta {
    const message = createBaseObjectMeta();
    message.name = object.name ?? "";
    message.generateName = object.generateName ?? "";
    message.namespace = object.namespace ?? "";
    message.selfLink = object.selfLink ?? "";
    message.uid = object.uid ?? "";
    message.resourceVersion = object.resourceVersion ?? "";
    message.generation = object.generation ?? 0;
    message.creationTimestamp =
      object.creationTimestamp !== undefined &&
      object.creationTimestamp !== null
        ? Time.fromPartial(object.creationTimestamp)
        : undefined;
    message.deletionTimestamp =
      object.deletionTimestamp !== undefined &&
      object.deletionTimestamp !== null
        ? Time.fromPartial(object.deletionTimestamp)
        : undefined;
    message.deletionGracePeriodSeconds = object.deletionGracePeriodSeconds ?? 0;
    message.labels = Object.entries(object.labels ?? {}).reduce<{
      [key: string]: string;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    message.annotations = Object.entries(object.annotations ?? {}).reduce<{
      [key: string]: string;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    message.ownerReferences =
      object.ownerReferences?.map((e) => OwnerReference.fromPartial(e)) || [];
    message.finalizers = object.finalizers?.map((e) => e) || [];
    message.clusterName = object.clusterName ?? "";
    message.managedFields =
      object.managedFields?.map((e) => ManagedFieldsEntry.fromPartial(e)) || [];
    return message;
  },
};

function createBaseObjectMeta_LabelsEntry(): ObjectMeta_LabelsEntry {
  return { key: "", value: "" };
}

export const ObjectMeta_LabelsEntry = {
  encode(
    message: ObjectMeta_LabelsEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ObjectMeta_LabelsEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseObjectMeta_LabelsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ObjectMeta_LabelsEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? String(object.value) : "",
    };
  },

  toJSON(message: ObjectMeta_LabelsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ObjectMeta_LabelsEntry>, I>>(
    object: I
  ): ObjectMeta_LabelsEntry {
    const message = createBaseObjectMeta_LabelsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseObjectMeta_AnnotationsEntry(): ObjectMeta_AnnotationsEntry {
  return { key: "", value: "" };
}

export const ObjectMeta_AnnotationsEntry = {
  encode(
    message: ObjectMeta_AnnotationsEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ObjectMeta_AnnotationsEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseObjectMeta_AnnotationsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ObjectMeta_AnnotationsEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? String(object.value) : "",
    };
  },

  toJSON(message: ObjectMeta_AnnotationsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ObjectMeta_AnnotationsEntry>, I>>(
    object: I
  ): ObjectMeta_AnnotationsEntry {
    const message = createBaseObjectMeta_AnnotationsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseOwnerReference(): OwnerReference {
  return {
    apiVersion: "",
    kind: "",
    name: "",
    uid: "",
    controller: false,
    blockOwnerDeletion: false,
  };
}

export const OwnerReference = {
  encode(
    message: OwnerReference,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.apiVersion !== "") {
      writer.uint32(42).string(message.apiVersion);
    }
    if (message.kind !== "") {
      writer.uint32(10).string(message.kind);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.uid !== "") {
      writer.uint32(34).string(message.uid);
    }
    if (message.controller === true) {
      writer.uint32(48).bool(message.controller);
    }
    if (message.blockOwnerDeletion === true) {
      writer.uint32(56).bool(message.blockOwnerDeletion);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OwnerReference {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOwnerReference();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 5:
          message.apiVersion = reader.string();
          break;
        case 1:
          message.kind = reader.string();
          break;
        case 3:
          message.name = reader.string();
          break;
        case 4:
          message.uid = reader.string();
          break;
        case 6:
          message.controller = reader.bool();
          break;
        case 7:
          message.blockOwnerDeletion = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): OwnerReference {
    return {
      apiVersion: isSet(object.apiVersion) ? String(object.apiVersion) : "",
      kind: isSet(object.kind) ? String(object.kind) : "",
      name: isSet(object.name) ? String(object.name) : "",
      uid: isSet(object.uid) ? String(object.uid) : "",
      controller: isSet(object.controller) ? Boolean(object.controller) : false,
      blockOwnerDeletion: isSet(object.blockOwnerDeletion)
        ? Boolean(object.blockOwnerDeletion)
        : false,
    };
  },

  toJSON(message: OwnerReference): unknown {
    const obj: any = {};
    message.apiVersion !== undefined && (obj.apiVersion = message.apiVersion);
    message.kind !== undefined && (obj.kind = message.kind);
    message.name !== undefined && (obj.name = message.name);
    message.uid !== undefined && (obj.uid = message.uid);
    message.controller !== undefined && (obj.controller = message.controller);
    message.blockOwnerDeletion !== undefined &&
      (obj.blockOwnerDeletion = message.blockOwnerDeletion);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<OwnerReference>, I>>(
    object: I
  ): OwnerReference {
    const message = createBaseOwnerReference();
    message.apiVersion = object.apiVersion ?? "";
    message.kind = object.kind ?? "";
    message.name = object.name ?? "";
    message.uid = object.uid ?? "";
    message.controller = object.controller ?? false;
    message.blockOwnerDeletion = object.blockOwnerDeletion ?? false;
    return message;
  },
};

function createBasePartialObjectMetadata(): PartialObjectMetadata {
  return { metadata: undefined };
}

export const PartialObjectMetadata = {
  encode(
    message: PartialObjectMetadata,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.metadata !== undefined) {
      ObjectMeta.encode(message.metadata, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): PartialObjectMetadata {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePartialObjectMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.metadata = ObjectMeta.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PartialObjectMetadata {
    return {
      metadata: isSet(object.metadata)
        ? ObjectMeta.fromJSON(object.metadata)
        : undefined,
    };
  },

  toJSON(message: PartialObjectMetadata): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? ObjectMeta.toJSON(message.metadata)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PartialObjectMetadata>, I>>(
    object: I
  ): PartialObjectMetadata {
    const message = createBasePartialObjectMetadata();
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? ObjectMeta.fromPartial(object.metadata)
        : undefined;
    return message;
  },
};

function createBasePartialObjectMetadataList(): PartialObjectMetadataList {
  return { metadata: undefined, items: [] };
}

export const PartialObjectMetadataList = {
  encode(
    message: PartialObjectMetadataList,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.metadata !== undefined) {
      ListMeta.encode(message.metadata, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.items) {
      PartialObjectMetadata.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): PartialObjectMetadataList {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePartialObjectMetadataList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.metadata = ListMeta.decode(reader, reader.uint32());
          break;
        case 2:
          message.items.push(
            PartialObjectMetadata.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PartialObjectMetadataList {
    return {
      metadata: isSet(object.metadata)
        ? ListMeta.fromJSON(object.metadata)
        : undefined,
      items: Array.isArray(object?.items)
        ? object.items.map((e: any) => PartialObjectMetadata.fromJSON(e))
        : [],
    };
  },

  toJSON(message: PartialObjectMetadataList): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? ListMeta.toJSON(message.metadata)
        : undefined);
    if (message.items) {
      obj.items = message.items.map((e) =>
        e ? PartialObjectMetadata.toJSON(e) : undefined
      );
    } else {
      obj.items = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PartialObjectMetadataList>, I>>(
    object: I
  ): PartialObjectMetadataList {
    const message = createBasePartialObjectMetadataList();
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? ListMeta.fromPartial(object.metadata)
        : undefined;
    message.items =
      object.items?.map((e) => PartialObjectMetadata.fromPartial(e)) || [];
    return message;
  },
};

function createBasePatch(): Patch {
  return {};
}

export const Patch = {
  encode(_: Patch, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Patch {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePatch();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): Patch {
    return {};
  },

  toJSON(_: Patch): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Patch>, I>>(_: I): Patch {
    const message = createBasePatch();
    return message;
  },
};

function createBasePatchOptions(): PatchOptions {
  return { dryRun: [], force: false, fieldManager: "" };
}

export const PatchOptions = {
  encode(
    message: PatchOptions,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.dryRun) {
      writer.uint32(10).string(v!);
    }
    if (message.force === true) {
      writer.uint32(16).bool(message.force);
    }
    if (message.fieldManager !== "") {
      writer.uint32(26).string(message.fieldManager);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PatchOptions {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePatchOptions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.dryRun.push(reader.string());
          break;
        case 2:
          message.force = reader.bool();
          break;
        case 3:
          message.fieldManager = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PatchOptions {
    return {
      dryRun: Array.isArray(object?.dryRun)
        ? object.dryRun.map((e: any) => String(e))
        : [],
      force: isSet(object.force) ? Boolean(object.force) : false,
      fieldManager: isSet(object.fieldManager)
        ? String(object.fieldManager)
        : "",
    };
  },

  toJSON(message: PatchOptions): unknown {
    const obj: any = {};
    if (message.dryRun) {
      obj.dryRun = message.dryRun.map((e) => e);
    } else {
      obj.dryRun = [];
    }
    message.force !== undefined && (obj.force = message.force);
    message.fieldManager !== undefined &&
      (obj.fieldManager = message.fieldManager);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PatchOptions>, I>>(
    object: I
  ): PatchOptions {
    const message = createBasePatchOptions();
    message.dryRun = object.dryRun?.map((e) => e) || [];
    message.force = object.force ?? false;
    message.fieldManager = object.fieldManager ?? "";
    return message;
  },
};

function createBasePreconditions(): Preconditions {
  return { uid: "", resourceVersion: "" };
}

export const Preconditions = {
  encode(
    message: Preconditions,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.uid !== "") {
      writer.uint32(10).string(message.uid);
    }
    if (message.resourceVersion !== "") {
      writer.uint32(18).string(message.resourceVersion);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Preconditions {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePreconditions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.uid = reader.string();
          break;
        case 2:
          message.resourceVersion = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Preconditions {
    return {
      uid: isSet(object.uid) ? String(object.uid) : "",
      resourceVersion: isSet(object.resourceVersion)
        ? String(object.resourceVersion)
        : "",
    };
  },

  toJSON(message: Preconditions): unknown {
    const obj: any = {};
    message.uid !== undefined && (obj.uid = message.uid);
    message.resourceVersion !== undefined &&
      (obj.resourceVersion = message.resourceVersion);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Preconditions>, I>>(
    object: I
  ): Preconditions {
    const message = createBasePreconditions();
    message.uid = object.uid ?? "";
    message.resourceVersion = object.resourceVersion ?? "";
    return message;
  },
};

function createBaseRootPaths(): RootPaths {
  return { paths: [] };
}

export const RootPaths = {
  encode(
    message: RootPaths,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.paths) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RootPaths {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRootPaths();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.paths.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RootPaths {
    return {
      paths: Array.isArray(object?.paths)
        ? object.paths.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: RootPaths): unknown {
    const obj: any = {};
    if (message.paths) {
      obj.paths = message.paths.map((e) => e);
    } else {
      obj.paths = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RootPaths>, I>>(
    object: I
  ): RootPaths {
    const message = createBaseRootPaths();
    message.paths = object.paths?.map((e) => e) || [];
    return message;
  },
};

function createBaseServerAddressByClientCIDR(): ServerAddressByClientCIDR {
  return { clientCIDR: "", serverAddress: "" };
}

export const ServerAddressByClientCIDR = {
  encode(
    message: ServerAddressByClientCIDR,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.clientCIDR !== "") {
      writer.uint32(10).string(message.clientCIDR);
    }
    if (message.serverAddress !== "") {
      writer.uint32(18).string(message.serverAddress);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ServerAddressByClientCIDR {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseServerAddressByClientCIDR();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clientCIDR = reader.string();
          break;
        case 2:
          message.serverAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ServerAddressByClientCIDR {
    return {
      clientCIDR: isSet(object.clientCIDR) ? String(object.clientCIDR) : "",
      serverAddress: isSet(object.serverAddress)
        ? String(object.serverAddress)
        : "",
    };
  },

  toJSON(message: ServerAddressByClientCIDR): unknown {
    const obj: any = {};
    message.clientCIDR !== undefined && (obj.clientCIDR = message.clientCIDR);
    message.serverAddress !== undefined &&
      (obj.serverAddress = message.serverAddress);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ServerAddressByClientCIDR>, I>>(
    object: I
  ): ServerAddressByClientCIDR {
    const message = createBaseServerAddressByClientCIDR();
    message.clientCIDR = object.clientCIDR ?? "";
    message.serverAddress = object.serverAddress ?? "";
    return message;
  },
};

function createBaseStatus(): Status {
  return {
    metadata: undefined,
    status: "",
    message: "",
    reason: "",
    details: undefined,
    code: 0,
  };
}

export const Status = {
  encode(
    message: Status,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.metadata !== undefined) {
      ListMeta.encode(message.metadata, writer.uint32(10).fork()).ldelim();
    }
    if (message.status !== "") {
      writer.uint32(18).string(message.status);
    }
    if (message.message !== "") {
      writer.uint32(26).string(message.message);
    }
    if (message.reason !== "") {
      writer.uint32(34).string(message.reason);
    }
    if (message.details !== undefined) {
      StatusDetails.encode(message.details, writer.uint32(42).fork()).ldelim();
    }
    if (message.code !== 0) {
      writer.uint32(48).int32(message.code);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Status {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.metadata = ListMeta.decode(reader, reader.uint32());
          break;
        case 2:
          message.status = reader.string();
          break;
        case 3:
          message.message = reader.string();
          break;
        case 4:
          message.reason = reader.string();
          break;
        case 5:
          message.details = StatusDetails.decode(reader, reader.uint32());
          break;
        case 6:
          message.code = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Status {
    return {
      metadata: isSet(object.metadata)
        ? ListMeta.fromJSON(object.metadata)
        : undefined,
      status: isSet(object.status) ? String(object.status) : "",
      message: isSet(object.message) ? String(object.message) : "",
      reason: isSet(object.reason) ? String(object.reason) : "",
      details: isSet(object.details)
        ? StatusDetails.fromJSON(object.details)
        : undefined,
      code: isSet(object.code) ? Number(object.code) : 0,
    };
  },

  toJSON(message: Status): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? ListMeta.toJSON(message.metadata)
        : undefined);
    message.status !== undefined && (obj.status = message.status);
    message.message !== undefined && (obj.message = message.message);
    message.reason !== undefined && (obj.reason = message.reason);
    message.details !== undefined &&
      (obj.details = message.details
        ? StatusDetails.toJSON(message.details)
        : undefined);
    message.code !== undefined && (obj.code = Math.round(message.code));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Status>, I>>(object: I): Status {
    const message = createBaseStatus();
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? ListMeta.fromPartial(object.metadata)
        : undefined;
    message.status = object.status ?? "";
    message.message = object.message ?? "";
    message.reason = object.reason ?? "";
    message.details =
      object.details !== undefined && object.details !== null
        ? StatusDetails.fromPartial(object.details)
        : undefined;
    message.code = object.code ?? 0;
    return message;
  },
};

function createBaseStatusCause(): StatusCause {
  return { reason: "", message: "", field: "" };
}

export const StatusCause = {
  encode(
    message: StatusCause,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.reason !== "") {
      writer.uint32(10).string(message.reason);
    }
    if (message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    if (message.field !== "") {
      writer.uint32(26).string(message.field);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StatusCause {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStatusCause();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.reason = reader.string();
          break;
        case 2:
          message.message = reader.string();
          break;
        case 3:
          message.field = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StatusCause {
    return {
      reason: isSet(object.reason) ? String(object.reason) : "",
      message: isSet(object.message) ? String(object.message) : "",
      field: isSet(object.field) ? String(object.field) : "",
    };
  },

  toJSON(message: StatusCause): unknown {
    const obj: any = {};
    message.reason !== undefined && (obj.reason = message.reason);
    message.message !== undefined && (obj.message = message.message);
    message.field !== undefined && (obj.field = message.field);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StatusCause>, I>>(
    object: I
  ): StatusCause {
    const message = createBaseStatusCause();
    message.reason = object.reason ?? "";
    message.message = object.message ?? "";
    message.field = object.field ?? "";
    return message;
  },
};

function createBaseStatusDetails(): StatusDetails {
  return {
    name: "",
    group: "",
    kind: "",
    uid: "",
    causes: [],
    retryAfterSeconds: 0,
  };
}

export const StatusDetails = {
  encode(
    message: StatusDetails,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.group !== "") {
      writer.uint32(18).string(message.group);
    }
    if (message.kind !== "") {
      writer.uint32(26).string(message.kind);
    }
    if (message.uid !== "") {
      writer.uint32(50).string(message.uid);
    }
    for (const v of message.causes) {
      StatusCause.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.retryAfterSeconds !== 0) {
      writer.uint32(40).int32(message.retryAfterSeconds);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StatusDetails {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStatusDetails();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.group = reader.string();
          break;
        case 3:
          message.kind = reader.string();
          break;
        case 6:
          message.uid = reader.string();
          break;
        case 4:
          message.causes.push(StatusCause.decode(reader, reader.uint32()));
          break;
        case 5:
          message.retryAfterSeconds = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StatusDetails {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      group: isSet(object.group) ? String(object.group) : "",
      kind: isSet(object.kind) ? String(object.kind) : "",
      uid: isSet(object.uid) ? String(object.uid) : "",
      causes: Array.isArray(object?.causes)
        ? object.causes.map((e: any) => StatusCause.fromJSON(e))
        : [],
      retryAfterSeconds: isSet(object.retryAfterSeconds)
        ? Number(object.retryAfterSeconds)
        : 0,
    };
  },

  toJSON(message: StatusDetails): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.group !== undefined && (obj.group = message.group);
    message.kind !== undefined && (obj.kind = message.kind);
    message.uid !== undefined && (obj.uid = message.uid);
    if (message.causes) {
      obj.causes = message.causes.map((e) =>
        e ? StatusCause.toJSON(e) : undefined
      );
    } else {
      obj.causes = [];
    }
    message.retryAfterSeconds !== undefined &&
      (obj.retryAfterSeconds = Math.round(message.retryAfterSeconds));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StatusDetails>, I>>(
    object: I
  ): StatusDetails {
    const message = createBaseStatusDetails();
    message.name = object.name ?? "";
    message.group = object.group ?? "";
    message.kind = object.kind ?? "";
    message.uid = object.uid ?? "";
    message.causes =
      object.causes?.map((e) => StatusCause.fromPartial(e)) || [];
    message.retryAfterSeconds = object.retryAfterSeconds ?? 0;
    return message;
  },
};

function createBaseTableOptions(): TableOptions {
  return { includeObject: "" };
}

export const TableOptions = {
  encode(
    message: TableOptions,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.includeObject !== "") {
      writer.uint32(10).string(message.includeObject);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TableOptions {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTableOptions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.includeObject = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TableOptions {
    return {
      includeObject: isSet(object.includeObject)
        ? String(object.includeObject)
        : "",
    };
  },

  toJSON(message: TableOptions): unknown {
    const obj: any = {};
    message.includeObject !== undefined &&
      (obj.includeObject = message.includeObject);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TableOptions>, I>>(
    object: I
  ): TableOptions {
    const message = createBaseTableOptions();
    message.includeObject = object.includeObject ?? "";
    return message;
  },
};

function createBaseTime(): Time {
  return { seconds: 0, nanos: 0 };
}

export const Time = {
  encode(message: Time, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.seconds !== 0) {
      writer.uint32(8).int64(message.seconds);
    }
    if (message.nanos !== 0) {
      writer.uint32(16).int32(message.nanos);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Time {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTime();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.seconds = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.nanos = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Time {
    return {
      seconds: isSet(object.seconds) ? Number(object.seconds) : 0,
      nanos: isSet(object.nanos) ? Number(object.nanos) : 0,
    };
  },

  toJSON(message: Time): unknown {
    const obj: any = {};
    message.seconds !== undefined &&
      (obj.seconds = Math.round(message.seconds));
    message.nanos !== undefined && (obj.nanos = Math.round(message.nanos));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Time>, I>>(object: I): Time {
    const message = createBaseTime();
    message.seconds = object.seconds ?? 0;
    message.nanos = object.nanos ?? 0;
    return message;
  },
};

function createBaseTimestamp(): Timestamp {
  return { seconds: 0, nanos: 0 };
}

export const Timestamp = {
  encode(
    message: Timestamp,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.seconds !== 0) {
      writer.uint32(8).int64(message.seconds);
    }
    if (message.nanos !== 0) {
      writer.uint32(16).int32(message.nanos);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Timestamp {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTimestamp();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.seconds = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.nanos = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Timestamp {
    return {
      seconds: isSet(object.seconds) ? Number(object.seconds) : 0,
      nanos: isSet(object.nanos) ? Number(object.nanos) : 0,
    };
  },

  toJSON(message: Timestamp): unknown {
    const obj: any = {};
    message.seconds !== undefined &&
      (obj.seconds = Math.round(message.seconds));
    message.nanos !== undefined && (obj.nanos = Math.round(message.nanos));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Timestamp>, I>>(
    object: I
  ): Timestamp {
    const message = createBaseTimestamp();
    message.seconds = object.seconds ?? 0;
    message.nanos = object.nanos ?? 0;
    return message;
  },
};

function createBaseTypeMeta(): TypeMeta {
  return { kind: "", apiVersion: "" };
}

export const TypeMeta = {
  encode(
    message: TypeMeta,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.kind !== "") {
      writer.uint32(10).string(message.kind);
    }
    if (message.apiVersion !== "") {
      writer.uint32(18).string(message.apiVersion);
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
          message.kind = reader.string();
          break;
        case 2:
          message.apiVersion = reader.string();
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
      kind: isSet(object.kind) ? String(object.kind) : "",
      apiVersion: isSet(object.apiVersion) ? String(object.apiVersion) : "",
    };
  },

  toJSON(message: TypeMeta): unknown {
    const obj: any = {};
    message.kind !== undefined && (obj.kind = message.kind);
    message.apiVersion !== undefined && (obj.apiVersion = message.apiVersion);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TypeMeta>, I>>(object: I): TypeMeta {
    const message = createBaseTypeMeta();
    message.kind = object.kind ?? "";
    message.apiVersion = object.apiVersion ?? "";
    return message;
  },
};

function createBaseUpdateOptions(): UpdateOptions {
  return { dryRun: [], fieldManager: "" };
}

export const UpdateOptions = {
  encode(
    message: UpdateOptions,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.dryRun) {
      writer.uint32(10).string(v!);
    }
    if (message.fieldManager !== "") {
      writer.uint32(18).string(message.fieldManager);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateOptions {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateOptions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.dryRun.push(reader.string());
          break;
        case 2:
          message.fieldManager = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateOptions {
    return {
      dryRun: Array.isArray(object?.dryRun)
        ? object.dryRun.map((e: any) => String(e))
        : [],
      fieldManager: isSet(object.fieldManager)
        ? String(object.fieldManager)
        : "",
    };
  },

  toJSON(message: UpdateOptions): unknown {
    const obj: any = {};
    if (message.dryRun) {
      obj.dryRun = message.dryRun.map((e) => e);
    } else {
      obj.dryRun = [];
    }
    message.fieldManager !== undefined &&
      (obj.fieldManager = message.fieldManager);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UpdateOptions>, I>>(
    object: I
  ): UpdateOptions {
    const message = createBaseUpdateOptions();
    message.dryRun = object.dryRun?.map((e) => e) || [];
    message.fieldManager = object.fieldManager ?? "";
    return message;
  },
};

function createBaseVerbs(): Verbs {
  return { items: [] };
}

export const Verbs = {
  encode(message: Verbs, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.items) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Verbs {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVerbs();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.items.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Verbs {
    return {
      items: Array.isArray(object?.items)
        ? object.items.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: Verbs): unknown {
    const obj: any = {};
    if (message.items) {
      obj.items = message.items.map((e) => e);
    } else {
      obj.items = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Verbs>, I>>(object: I): Verbs {
    const message = createBaseVerbs();
    message.items = object.items?.map((e) => e) || [];
    return message;
  },
};

function createBaseWatchEvent(): WatchEvent {
  return { type: "", object: undefined };
}

export const WatchEvent = {
  encode(
    message: WatchEvent,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.type !== "") {
      writer.uint32(10).string(message.type);
    }
    if (message.object !== undefined) {
      RawExtension.encode(message.object, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WatchEvent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWatchEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.string();
          break;
        case 2:
          message.object = RawExtension.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): WatchEvent {
    return {
      type: isSet(object.type) ? String(object.type) : "",
      object: isSet(object.object)
        ? RawExtension.fromJSON(object.object)
        : undefined,
    };
  },

  toJSON(message: WatchEvent): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = message.type);
    message.object !== undefined &&
      (obj.object = message.object
        ? RawExtension.toJSON(message.object)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WatchEvent>, I>>(
    object: I
  ): WatchEvent {
    const message = createBaseWatchEvent();
    message.type = object.type ?? "";
    message.object =
      object.object !== undefined && object.object !== null
        ? RawExtension.fromPartial(object.object)
        : undefined;
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

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
