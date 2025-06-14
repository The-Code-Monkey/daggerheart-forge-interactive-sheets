interface Notes {
  /**
   * Represents the timestamp indicating when an entity was created.
   * The value should be a string formatted as an ISO 8601 date-time.
   */
  created_at: string;
  /**
   * Represents the timestamp indicating when an entity was updated.
   * The value should be a string formatted as an ISO 8601 date-time.
   */
  updated_at: string;
  /**
   * Defines the visibility level of the note
   *
   * The possible values are:
   * - "private": The content is only visible to the gamemaster.
   * - "players": The content is visible to all players who are members of the campaign
   * - "everyone": The content is visible to all users without restriction.
   */
  visibility: ["private" | "players" | "everyone"];
  /**.
   * This can be used to store additional information or comments.
   * Typically used for sorting records.
   */
  note?: string;
  /**
   * Represents an optional set of tags, typically used for labeling, categorization, or grouping elements.
   * This variable holds an array of strings, where each string acts as a tag.
   */
  tagset?: string[];
}

interface QuestSteps {
  /**
   * Represent the name of the quest step (Required).
   */
  name: string;
  /**
   * Indicates whether the quest step has been successfully completed.
   */
  completed: boolean;
  /**
   * Defines the visibility level of the note (Required, default: private)
   *
   * The possible values are:
   * - "private": The content is only visible to the gamemaster.
   * - "players": The content is visible to all players who are members of the campaign
   * - "everyone": The content is visible to all users without restriction.
   */
  visibility: ["private" | "players" | "everyone"];
  /**
   * Represents the timestamp indicating when a quest step was created.
   * The value should be a string formatted as an ISO 8601 date-time.
   */
  created_at: string;
  /**
   * Represents the timestamp indicating when an entity was updated.
   * Typically used for sorting records.
   * The value should be a string formatted as an ISO 8601 date-time.
   */
  updated_at: string;
  /**
   * An optional property that represents a textual description.
   * This provides more information about this phase of a particular quest.
   */
  description?: string;
  /**
   * Represents an optional collection of notes associated with a given quest step.
   */
  notes?: Notes[];
}

interface Quests {
  /**
   * Represents the name of a quest (Required).
   */
  name: string;
  /**
   * Indicates whether the quest has been completed.
   * The value is `true` if the task is finished, otherwise `false`.
   */
  completed: boolean;
  /**
   * Defines the visibility level of the note (Required, default: private)
   *
   * The possible values are:
   * - "private": The content is only visible to the gamemaster.
   * - "players": The content is visible to all players who are members of the campaign
   * - "everyone": The content is visible to all users without restriction.
   */
  visibility: ["private" | "players" | "everyone"];
  /**
   * An optional property that represents a textual description.
   * This provides more information about this phase of a particular quest.
   */
  description?: string;
  /**
   * Used to designate a character, NPC, or object responsible for giving the quest to the player.
   * This value is optional and may be undefined if no quest giver is specified.
   */
  quest_giver?: string;
  /**
   * Represents an optional list of steps associated with a quest.
   * Each step in the array is expected to be of type QuestSteps, defining specific actions or stages in the quest.
   */
  steps?: QuestSteps[];
  /**
   * Represents an optional array of note objects.
   * Each note encapsulates relevant information or data.
   *
   * This property is intended to store multiple notes related to a specific Quest.
   * If no notes are available, the property may be set to undefined.
   *
   * @type {Notes[] | undefined}
   */
  notes?: Notes[];
  /**
   * Represents the timestamp indicating when an entity was created.
   * The value should be a string formatted as an ISO 8601 date-time.
   */
  created_at: string;
  /**
   * Represents the timestamp indicating when an entity was updated.
   * Typically used for sorting records.
   * The value should be a string formatted as an ISO 8601 date-time.
   */
  updated_at: string;
}

interface Locations {
  /**
   * Represents the name of a Location.
   */
  name: string;
  /**
   * Defines the visibility level of the note (Required, default: private)
   *
   * The possible values are:
   * - "private": The content is only visible to the gamemaster.
   * - "players": The content is visible to all players who are members of the campaign
   * - "everyone": The content is visible to all users without restriction.
   */
  visibility: ["private" | "players" | "everyone"];
  /**
   * An optional textual description providing additional details about a location.
   */
  description?: string;
  /**
   * Represents an optional array of note objects.
   * Each note encapsulates relevant information or data.
   *
   * This property is intended to store multiple notes related to a specific location.
   * If no notes are available, the property may be set to undefined.
   *
   * @type {Notes[] | undefined}
   */
  notes?: Notes[];
  /**
   * Represents an optional array of major non-player characters (NPCs).
   *
   * This variable holds the identifiers for primary NPCs in a game or storyline.
   * These characters are typically pivotal to the game's narrative or progression.
   *
   * @type {string[] | undefined}
   */
  major_NPCs?: string[];
  /**
   * Represents an optional array of minor non-playable character (NPC) names.
   * These NPCs are typically not central to the main gameplay or storylines.
   */
  minor_NPCs?: string[];
  /**
   * Represents an optional list of timestamps indicating the last time players visited the location.
   * The value should be a string formatted as an ISO 8601 date-time.
   */
  players_last_visited?: string;
}

interface NPCs {
  /**
   * Represents the name of a non-player character (NPC).
   */
  name: string;
  /**
   * Defines the visibility level of the note (Required, default: private)
   *
   * The possible values are:
   * - "private": The content is only visible to the gamemaster.
   * - "players": The content is visible to all players who are members of the campaign
   * - "everyone": The content is visible to all users without restriction.
   */
  visibility: ["private" | "players" | "everyone"];
  /**
   * An optional textual description providing additional details about an NPC.
   */
  description?: string;
  /**
   * An optional array representing a collection of notes.
   *
   * Each item in the array is expected to follow the structure and type defined by the `Notes` interface or type.
   * This property can be used to store additional information, comments, or data pertaining to the associated entity.
   */
  notes?: Notes[];
  /**
   * Represents the unique identifier for a specific location.
   * This identifier is optional and may not always be provided.
   * Typically used to associate an NPC with a particular location.
   */
  location_id?: string;
}

interface Sessions {
  /**
   * Represents the date and time of a session.
   * Expected to be in a string format, typically following standard date-time conventions.
   * This variable is used to store or retrieve the specific moment when a session occurs.
   */
  session_datetime: string;
  /**
   * Indicates whether a session has been initiated.
   * This variable is a boolean that stores the state of the session.
   * A value of `true` represents a played session, whereas `false` means the session was not played.
   */
  session_started: boolean;
  /**
   * An optional description providing additional details or context.
   * This is typically a short text or summary.
   */
  description?: string;
  /**
   * Represents an optional array of note objects.
   * Each note encapsulates relevant information or data.
   *
   * This property is intended to store multiple notes related to a specific location.
   * If no notes are available, the property may be set to undefined.
   *
   * @type {Notes[] | undefined}
   */
  notes?: Notes[];
  /**
   * An optional property that allows for overriding the default
   * URL of the virtual tabletop with a specific custom URL.
   * This can be used to define a unique endpoint for a virtual
   * tabletop integration or to point to a different resource
   * than the standard configuration for a particular session.
   *
   * @type {string | undefined}
   */
  override_virtual_tabletop_url?: string;
}

export interface CampaignFormData {
  /**
   * Represents the current state or condition of an entity or process.
   *
   * Possible values:
   * - "active": Indicates that the campaign is actively playing, but not actively recruiting players.
   * - "looking_for_players": Indicates that the campaign is actively recruiting players.
   * - "hidden": Indicates that the entity is not visible or publicly accessible.
   * - "completed": Indicates that the campaign is finished.
   */
  status: "active" | "hidden" | "completed" | "looking_for_players";
  /**
   * Indicates whether the campaign is currently searching for additional players.
   *
   * This boolean variable serves as a flag to determine if more players are needed
   * for an activity, game, or team. When set to `true`, it signifies active solicitation
   * or recruitment of players. Conversely, when set to `false`, it assumes no additional
   * players are being sought.
   */
  looking_for_players: boolean;
  /**
   * Represents the name of a campaign.
   * This property is shown to all users.
   */
  name: string;
  /**
   * Represents the identifier of the user responsible for creating the campaign.
   */
  created_by: string;
  /**
   * An optional string property that provides additional details or context.
   * It can be used to store a brief explanation or metadata.
   * This property is shown to all users.
   */
  description?: string;
  /**
   * Specifies the maximum number of players allowed in a game or session.
   * This value can be undefined, indicating no explicit limit on players.
   * Used to enforce player count restrictions where applicable.
   */
  max_player_count?: number;
  /**
   * Represents the number of fear tokens available to the gamemaster (GM).
   * If this variable is not defined, it will default to 0.
   * A fear token can be used to track or quantify fear in game mechanics, simulations, or other systems.
   */
  fear_tokens?: number;
  /**
   * Represents an optional array of note objects.
   * Each note encapsulates relevant information or data.
   *
   * This property is intended to store multiple notes related to a specific campaign
   * that is not associated with a specific location, NPC, quest, etc.
   * If no notes are available, the property may be set to undefined.
   *
   * @type {Notes[] | undefined}
   */
  notes?: Notes[];
  /**
   * Represents an optional array of session objects that stores session-related information.
   * This property can be undefined or hold an array of `Sessions` instances.
   *
   * @type {Sessions[] | undefined}
   */
  sessions?: Sessions[];
  /**
   * Represents an optional list of quests.
   * Each quest in the list is represented as an object of type `Quests`.
   */
  quests?: Quests[];
  /**
   * Optional array of location objects associated with the campaign.
   * Each entry in the array should conform to the `Locations` type definition.
   */
  locations?: Locations[];
  /**
   * Represents an optional list of major non-player characters (NPCs).
   * This array contains the key NPCs relevant to the game or storyline.
   * Each entry in the array is expected to adhere to the `NPCs` type structure.
   */
  major_NPCs?: NPCs[];
  /**
   * Represents an optional list of minor NPCs (non-playable characters) in the system.
   *
   * This variable is used to manage and interact with minor NPC data within the application.
   *
   * @type {NPCs[] | undefined}
   */
  minor_NPCs?: NPCs[];
  /**
   * The default URL for the virtual tabletop platform used by the campaign.
   * This optional string variable can be used to specify a predefined
   * URL for the virtual tabletop, providing a default link for users
   * if no other URL is configured.
   *
   * A session may override this URL.
   */
  default_virtual_tabletop_url?: string;
  /**
   * An optional array containing the user IDs of players.
   */
  player_user_ids?: string[];
}
