/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export type paths = {
  "/creator-roles": {
    get: operations["creator-roles_list"];
    parameters: {};
  };
  "/creators": {
    get: operations["creators_list"];
    parameters: {};
  };
  [key: `/creators/${number}`]: {
    get: operations["creators_read"];
    parameters: {
      path: {
        /** A unique integer value identifying this Person. */
        id: number;
      };
    };
  };
  "/developers": {
    get: operations["developers_list"];
    parameters: {};
  };
  [key: `/developers/${number}`]: {
    get: operations["developers_read"];
    parameters: {
      path: {
        /** A unique integer value identifying this Developer. */
        id: number;
      };
    };
  };
  "/games": {
    get: operations["games_list"];
    parameters: {};
  };
  [key: `/games/${string}/additions`]: {
    get: operations["games_additions_list"];
    parameters: {
      path: {
        game_pk: string;
      };
    };
  };
  [key: `/games/${string}/development-team`]: {
    get: operations["games_development-team_list"];
    parameters: {
      path: {
        game_pk: string;
      };
    };
  };
  [key: `/games/${string}/game-series`]: {
    get: operations["games_game-series_list"];
    parameters: {
      path: {
        game_pk: string;
      };
    };
  };
  [key: `/games/${string}/parent-games`]: {
    get: operations["games_parent-games_list"];
    parameters: {
      path: {
        game_pk: string;
      };
    };
  };
  [key: `/games/${string}/screenshots`]: {
    get: operations["games_screenshots_list"];
    parameters: {
      path: {
        game_pk: string;
      };
    };
  };
  [key: `/games/${string}/stores`]: {
    get: operations["games_stores_list"];
    parameters: {
      path: {
        game_pk: string;
      };
    };
  };
  [key: `/games/${number}`]: {
    get: operations["games_read"];
    parameters: {
      path: {
        /** A unique integer value identifying this Game. */
        id: number;
      };
    };
  };
  [key: `/games/${number}/achievements`]: {
    get: operations["games_achievements_read"];
    parameters: {
      path: {
        /** A unique integer value identifying this Game. */
        id: number;
      };
    };
  };
  [key: `/games/${number}/movies`]: {
    get: operations["games_movies_read"];
    parameters: {
      path: {
        /** A unique integer value identifying this Game. */
        id: number;
      };
    };
  };
  [key: `/games/${number}/reddit`]: {
    get: operations["games_reddit_read"];
    parameters: {
      path: {
        /** A unique integer value identifying this Game. */
        id: number;
      };
    };
  };
  [key: `/games/${number}/suggested`]: {
    get: operations["games_suggested_read"];
    parameters: {
      path: {
        /** A unique integer value identifying this Game. */
        id: number;
      };
    };
  };
  [key: `/games/${number}/twitch`]: {
    get: operations["games_twitch_read"];
    parameters: {
      path: {
        /** A unique integer value identifying this Game. */
        id: number;
      };
    };
  };
  [key: `/games/${number}/youtube`]: {
    get: operations["games_youtube_read"];
    parameters: {
      path: {
        /** A unique integer value identifying this Game. */
        id: number;
      };
    };
  };
  "/genres": {
    get: operations["genres_list"];
    parameters: {};
  };
  [key: `/genres/${number}`]: {
    get: operations["genres_read"];
    parameters: {
      path: {
        /** A unique integer value identifying this Genre. */
        id: number;
      };
    };
  };
  "/platforms": {
    get: operations["platforms_list"];
    parameters: {};
  };
  "/platforms/lists/parents": {
    /** For instance, for PS2 and PS4 the “parent platform” is PlayStation. */
    get: operations["platforms_lists_parents_list"];
    parameters: {};
  };
  [key: `/platforms/${number}`]: {
    get: operations["platforms_read"];
    parameters: {
      path: {
        /** A unique integer value identifying this Platform. */
        id: number;
      };
    };
  };
  "/publishers": {
    get: operations["publishers_list"];
    parameters: {};
  };
  [key: `/publishers/${number}`]: {
    get: operations["publishers_read"];
    parameters: {
      path: {
        /** A unique integer value identifying this Publisher. */
        id: number;
      };
    };
  };
  "/stores": {
    get: operations["stores_list"];
    parameters: {};
  };
  [key: `/stores/${number}`]: {
    get: operations["stores_read"];
    parameters: {
      path: {
        /** A unique integer value identifying this Store. */
        id: number;
      };
    };
  };
  "/tags": {
    get: operations["tags_list"];
    parameters: {};
  };
  [key: `/tags/${number}`]: {
    get: operations["tags_read"];
    parameters: {
      path: {
        /** A unique integer value identifying this Tag. */
        id: number;
      };
    };
  };
};

export type definitions = {
  Position: {
    /** ID */
    id?: number;
    /** Name */
    name?: string;
    /**
     * Slug
     * Format: slug
     */
    slug?: string;
  };
  Person: {
    /** ID */
    id?: number;
    /** Name */
    name: string;
    /**
     * Slug
     * Format: slug
     */
    slug?: string;
    /**
     * Image
     * Format: uri
     */
    image?: string;
    /**
     * Image background
     * Format: uri
     */
    image_background?: string;
    /** Games count */
    games_count?: number;
  };
  PersonSingle: {
    /** ID */
    id?: number;
    /** Name */
    name: string;
    /**
     * Slug
     * Format: slug
     */
    slug?: string;
    /**
     * Image
     * Format: uri
     */
    image?: string;
    /**
     * Image background
     * Format: uri
     */
    image_background?: string;
    /** Description */
    description?: string;
    /** Games count */
    games_count?: number;
    /** Reviews count */
    reviews_count?: number;
    /**
     * Rating
     * Format: decimal
     */
    rating?: string;
    /** Rating top */
    rating_top?: number;
    /**
     * Updated
     * Format: date-time
     */
    updated?: string;
  };
  Developer: {
    /** ID */
    id?: number;
    /** Name */
    name: string;
    /**
     * Slug
     * Format: slug
     */
    slug?: string;
    /** Games count */
    games_count?: number;
    /**
     * Image background
     * Format: uri
     */
    image_background?: string;
  };
  DeveloperSingle: {
    /** ID */
    id?: number;
    /** Name */
    name: string;
    /**
     * Slug
     * Format: slug
     */
    slug?: string;
    /** Games count */
    games_count?: number;
    /**
     * Image background
     * Format: uri
     */
    image_background?: string;
    /** Description */
    description?: string;
  };
  Game: {
    /** ID */
    id?: number;
    /**
     * Slug
     * Format: slug
     */
    slug?: string;
    /** Name */
    name?: string;
    /**
     * Released
     * Format: date
     */
    released?: string;
    /** TBA */
    tba?: boolean;
    /**
     * Background image
     * Format: uri
     */
    background_image?: string;
    /** Rating */
    rating: number;
    /** Rating top */
    rating_top?: number;
    /** Ratings */
    ratings?: { [key: string]: unknown };
    /** Ratings count */
    ratings_count?: number;
    /** Reviews text count */
    reviews_text_count?: string;
    /** Added */
    added?: number;
    /** Added by status */
    added_by_status?: { [key: string]: unknown };
    /** Metacritic */
    metacritic?: number;
    /**
     * Playtime
     * @description in hours
     */
    playtime?: number;
    /** Suggestions count */
    suggestions_count?: number;
    /**
     * Updated
     * Format: date-time
     */
    updated?: string;
    esrb_rating?: {
      id?: number;
      /** @enum {string} */
      slug?:
        | "everyone"
        | "everyone-10-plus"
        | "teen"
        | "mature"
        | "adults-only"
        | "rating-pending";
      /** @enum {string} */
      name?:
        | "Everyone"
        | "Everyone 10+"
        | "Teen"
        | "Mature"
        | "Adults Only"
        | "Rating Pending";
    };
    platforms?: {
      platform?: {
        id?: number;
        slug?: string;
        name?: string;
      };
      released_at?: string;
      requirements?: {
        minimum?: string;
        recommended?: string;
      };
    }[];
  };
  GamePersonList: {
    /** ID */
    id?: number;
    /** Name */
    name: string;
    /**
     * Slug
     * Format: slug
     */
    slug?: string;
    /**
     * Image
     * Format: uri
     */
    image?: string;
    /**
     * Image background
     * Format: uri
     */
    image_background?: string;
    /** Games count */
    games_count?: number;
  };
  /**
   * @example {
   *   "image": "@image.jpg",
   *   "hidden": false
   * }
   */
  ScreenShot: {
    /** ID */
    id?: number;
    /**
     * Image
     * Format: uri
     * @description An image file with size up to 20 MB.
     */
    image?: string;
    /**
     * Hidden
     * @description Set image as hidden or visible.
     * @default false
     */
    hidden?: boolean;
    /** Width */
    width?: number;
    /** Height */
    height?: number;
  };
  GameStoreFull: {
    /** ID */
    id?: number;
    /** Game id */
    game_id?: string;
    /** Store id */
    store_id?: string;
    /**
     * Url
     * Format: uri
     */
    url: string;
  };
  GamePlatformMetacritic: {
    /** Metascore */
    metascore?: number;
    /** Url */
    url?: string;
  };
  GameSingle: {
    /** ID */
    id?: number;
    /**
     * Slug
     * Format: slug
     */
    slug?: string;
    /** Name */
    name?: string;
    /** Name original */
    name_original?: string;
    /** Description */
    description?: string;
    /** Metacritic */
    metacritic?: number;
    metacritic_platforms?: definitions["GamePlatformMetacritic"][];
    /**
     * Released
     * Format: date
     */
    released?: string;
    /** TBA */
    tba?: boolean;
    /**
     * Updated
     * Format: date-time
     */
    updated?: string;
    /**
     * Background image
     * Format: uri
     */
    background_image?: string;
    /** Background image additional */
    background_image_additional?: string;
    /**
     * Website
     * Format: uri
     */
    website?: string;
    /** Rating */
    rating: number;
    /** Rating top */
    rating_top?: number;
    /** Ratings */
    ratings?: { [key: string]: unknown };
    /** Reactions */
    reactions?: { [key: string]: unknown };
    /** Added */
    added?: number;
    /** Added by status */
    added_by_status?: { [key: string]: unknown };
    /**
     * Playtime
     * @description in hours
     */
    playtime?: number;
    /** Screenshots count */
    screenshots_count?: number;
    /** Movies count */
    movies_count?: number;
    /** Creators count */
    creators_count?: number;
    /** Achievements count */
    achievements_count?: number;
    /** Parent achievements count */
    parent_achievements_count?: string;
    /**
     * Reddit url
     * @description For example "https://www.reddit.com/r/uncharted/" or "uncharted"
     */
    reddit_url?: string;
    /** Reddit name */
    reddit_name?: string;
    /** Reddit description */
    reddit_description?: string;
    /**
     * Reddit logo
     * Format: uri
     */
    reddit_logo?: string;
    /** Reddit count */
    reddit_count?: number;
    /** Twitch count */
    twitch_count?: string;
    /** Youtube count */
    youtube_count?: string;
    /** Reviews text count */
    reviews_text_count?: string;
    /** Ratings count */
    ratings_count?: number;
    /** Suggestions count */
    suggestions_count?: number;
    alternative_names?: string[];
    /**
     * Metacritic url
     * @description For example "http://www.metacritic.com/game/playstation-4/the-witcher-3-wild-hunt"
     */
    metacritic_url?: string;
    /** Parents count */
    parents_count?: number;
    /** Additions count */
    additions_count?: number;
    /** Game series count */
    game_series_count?: number;
    esrb_rating?: {
      id?: number;
      /** @enum {string} */
      slug?:
        | "everyone"
        | "everyone-10-plus"
        | "teen"
        | "mature"
        | "adults-only"
        | "rating-pending";
      /** @enum {string} */
      name?:
        | "Everyone"
        | "Everyone 10+"
        | "Teen"
        | "Mature"
        | "Adults Only"
        | "Rating Pending";
    };
    platforms?: {
      platform?: {
        id?: number;
        slug?: string;
        name?: string;
      };
      released_at?: string;
      requirements?: {
        minimum?: string;
        recommended?: string;
      };
    }[];
  };
  ParentAchievement: {
    /** ID */
    id?: number;
    /** Name */
    name?: string;
    /** Description */
    description?: string;
    /**
     * Image
     * Format: uri
     */
    image?: string;
    /**
     * Percent
     * Format: decimal
     */
    percent?: string;
  };
  Movie: {
    /** ID */
    id?: number;
    /** Name */
    name?: string;
    /**
     * Preview
     * Format: uri
     */
    preview?: string;
    /** Data */
    data?: { [key: string]: unknown };
  };
  Reddit: {
    /** ID */
    id?: number;
    /** Name */
    name?: string;
    /** Text */
    text?: string;
    /**
     * Image
     * Format: uri
     */
    image?: string;
    /**
     * Url
     * Format: uri
     */
    url?: string;
    /** Username */
    username?: string;
    /**
     * Username url
     * Format: uri
     */
    username_url?: string;
    /**
     * Created
     * Format: date-time
     */
    created?: string;
  };
  Twitch: {
    /** ID */
    id?: number;
    /** External id */
    external_id?: number;
    /** Name */
    name?: string;
    /** Description */
    description?: string;
    /**
     * Created
     * Format: date-time
     */
    created?: string;
    /**
     * Published
     * Format: date-time
     */
    published?: string;
    /**
     * Thumbnail
     * Format: uri
     */
    thumbnail?: string;
    /** View count */
    view_count?: number;
    /** Language */
    language?: string;
  };
  Youtube: {
    /** ID */
    id?: number;
    /** External id */
    external_id?: string;
    /** Channel id */
    channel_id?: string;
    /** Channel title */
    channel_title?: string;
    /** Name */
    name?: string;
    /** Description */
    description?: string;
    /**
     * Created
     * Format: date-time
     */
    created?: string;
    /** View count */
    view_count?: number;
    /** Comments count */
    comments_count?: number;
    /** Like count */
    like_count?: number;
    /** Dislike count */
    dislike_count?: number;
    /** Favorite count */
    favorite_count?: number;
    /** Thumbnails */
    thumbnails?: { [key: string]: unknown };
  };
  Genre: {
    /** ID */
    id?: number;
    /** Name */
    name: string;
    /**
     * Slug
     * Format: slug
     */
    slug?: string;
    /** Games count */
    games_count?: number;
    /**
     * Image background
     * Format: uri
     */
    image_background?: string;
  };
  GenreSingle: {
    /** ID */
    id?: number;
    /** Name */
    name: string;
    /**
     * Slug
     * Format: slug
     */
    slug?: string;
    /** Games count */
    games_count?: number;
    /**
     * Image background
     * Format: uri
     */
    image_background?: string;
    /** Description */
    description?: string;
  };
  Platform: {
    /** ID */
    id?: number;
    /** Name */
    name: string;
    /**
     * Slug
     * Format: slug
     */
    slug?: string;
    /** Games count */
    games_count?: number;
    /**
     * Image background
     * Format: uri
     */
    image_background?: string;
    /**
     * Image
     * Format: uri
     */
    image?: string;
    /** Year start */
    year_start?: number;
    /** Year end */
    year_end?: number;
  };
  PlatformParentSingle: {
    /** ID */
    id?: number;
    /** Name */
    name: string;
    /**
     * Slug
     * Format: slug
     */
    slug?: string;
    platforms: definitions["Platform"][];
  };
  PlatformSingle: {
    /** ID */
    id?: number;
    /** Name */
    name: string;
    /**
     * Slug
     * Format: slug
     */
    slug?: string;
    /** Games count */
    games_count?: number;
    /**
     * Image background
     * Format: uri
     */
    image_background?: string;
    /** Description */
    description?: string;
    /**
     * Image
     * Format: uri
     */
    image?: string;
    /** Year start */
    year_start?: number;
    /** Year end */
    year_end?: number;
  };
  Publisher: {
    /** ID */
    id?: number;
    /** Name */
    name: string;
    /**
     * Slug
     * Format: slug
     */
    slug?: string;
    /** Games count */
    games_count?: number;
    /**
     * Image background
     * Format: uri
     */
    image_background?: string;
  };
  PublisherSingle: {
    /** ID */
    id?: number;
    /** Name */
    name: string;
    /**
     * Slug
     * Format: slug
     */
    slug?: string;
    /** Games count */
    games_count?: number;
    /**
     * Image background
     * Format: uri
     */
    image_background?: string;
    /** Description */
    description?: string;
  };
  Store: {
    /** ID */
    id?: number;
    /** Name */
    name: string;
    /** Domain */
    domain?: string;
    /**
     * Slug
     * Format: slug
     */
    slug?: string;
    /** Games count */
    games_count?: number;
    /**
     * Image background
     * Format: uri
     */
    image_background?: string;
  };
  StoreSingle: {
    /** ID */
    id?: number;
    /** Name */
    name: string;
    /** Domain */
    domain?: string;
    /**
     * Slug
     * Format: slug
     */
    slug?: string;
    /** Games count */
    games_count?: number;
    /**
     * Image background
     * Format: uri
     */
    image_background?: string;
    /** Description */
    description?: string;
  };
  Tag: {
    /** ID */
    id?: number;
    /** Name */
    name: string;
    /**
     * Slug
     * Format: slug
     */
    slug?: string;
    /** Games count */
    games_count?: number;
    /**
     * Image background
     * Format: uri
     */
    image_background?: string;
    /** Language */
    language?: string;
  };
  TagSingle: {
    /** ID */
    id?: number;
    /** Name */
    name: string;
    /**
     * Slug
     * Format: slug
     */
    slug?: string;
    /** Games count */
    games_count?: number;
    /**
     * Image background
     * Format: uri
     */
    image_background?: string;
    /** Description */
    description?: string;
  };
};

export type operations = {
  "creator-roles_list": {
    parameters: {
      query: {
        /** A page number within the paginated result set. */
        page?: number;
        /** Number of results to return per page. */
        page_size?: number;
      };
    };
    responses: {
      200: {
        schema: {
          count: number;
          /** Format: uri */
          next?: string;
          /** Format: uri */
          previous?: string;
          results: definitions["Position"][];
        };
      };
    };
  };
  creators_list: {
    parameters: {
      query: {
        /** A page number within the paginated result set. */
        page?: number;
        /** Number of results to return per page. */
        page_size?: number;
      };
    };
    responses: {
      200: {
        schema: {
          count: number;
          /** Format: uri */
          next?: string;
          /** Format: uri */
          previous?: string;
          results: definitions["Person"][];
        };
      };
    };
  };
  creators_read: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      200: {
        schema: definitions["PersonSingle"];
      };
    };
  };
  developers_list: {
    parameters: {
      query: {
        /** A page number within the paginated result set. */
        page?: number;
        /** Number of results to return per page. */
        page_size?: number;
      };
    };
    responses: {
      200: {
        schema: {
          count: number;
          /** Format: uri */
          next?: string;
          /** Format: uri */
          previous?: string;
          results: definitions["Developer"][];
        };
      };
    };
  };
  developers_read: {
    parameters: {
      path: {
        /** A unique integer value identifying this Developer. */
        id: number;
      };
    };
    responses: {
      200: {
        schema: definitions["DeveloperSingle"];
      };
    };
  };
  games_list: {
    parameters: {
      query: {
        /** A page number within the paginated result set. */
        page?: number;
        /** Number of results to return per page. */
        page_size?: number;
        /** Search query. */
        search?: string;
        /** Disable fuzziness for the search query. */
        search_precise?: boolean;
        /** Mark the search query as exact. */
        search_exact?: boolean;
        /** Filter by parent platforms, for example: `1,2,3`. */
        parent_platforms?: string;
        /** Filter by platforms, for example: `4,5`. */
        platforms?: string;
        /** Filter by stores, for example: `5,6`. */
        stores?: string;
        /** Filter by developers, for example: `1612,18893` or `valve-software,feral-interactive`. */
        developers?: string;
        /** Filter by publishers, for example: `354,20987` or `electronic-arts,microsoft-studios`. */
        publishers?: string;
        /** Filter by genres, for example: `4,51` or `action,indie`. */
        genres?: string;
        /** Filter by tags, for example: `31,7` or `singleplayer,multiplayer`. */
        tags?: string;
        /** Filter by creators, for example: `78,28` or `cris-velasco,mike-morasky`. */
        creators?: string;
        /** Filter by a release date, for example: `2010-01-01,2018-12-31.1960-01-01,1969-12-31`. */
        dates?: string;
        /** Filter by an update date, for example: `2020-12-01,2020-12-31`. */
        updated?: string;
        /** Filter by platforms count, for example: `1`. */
        platforms_count?: number;
        /** Filter by a metacritic rating, for example: `80,100`. */
        metacritic?: string;
        /** Exclude games from a particular collection, for example: `123`. */
        exclude_collection?: number;
        /** Exclude additions. */
        exclude_additions?: boolean;
        /** Exclude games which have additions. */
        exclude_parents?: boolean;
        /** Exclude games which included in a game series. */
        exclude_game_series?: boolean;
        /** Exclude stores, for example: `5,6`. */
        exclude_stores?: string;
        /** Available fields: `name`, `released`, `added`, `created`, `updated`, `rating`, `metacritic`. You can reverse the sort order adding a hyphen, for example: `-released`. */
        ordering?: string;
      };
    };
    responses: {
      200: {
        schema: {
          count: number;
          /** Format: uri */
          next?: string;
          /** Format: uri */
          previous?: string;
          results: definitions["Game"][];
        };
      };
    };
  };
  games_additions_list: {
    parameters: {
      path: {
        game_pk: string;
      };
      query: {
        /** A page number within the paginated result set. */
        page?: number;
        /** Number of results to return per page. */
        page_size?: number;
      };
    };
    responses: {
      200: {
        schema: {
          count: number;
          /** Format: uri */
          next?: string;
          /** Format: uri */
          previous?: string;
          results: definitions["Game"][];
        };
      };
    };
  };
  "games_development-team_list": {
    parameters: {
      path: {
        game_pk: string;
      };
      query: {
        /** Which field to use when ordering the results. */
        ordering?: string;
        /** A page number within the paginated result set. */
        page?: number;
        /** Number of results to return per page. */
        page_size?: number;
      };
    };
    responses: {
      200: {
        schema: {
          count: number;
          /** Format: uri */
          next?: string;
          /** Format: uri */
          previous?: string;
          results: definitions["GamePersonList"][];
        };
      };
    };
  };
  "games_game-series_list": {
    parameters: {
      path: {
        game_pk: string;
      };
      query: {
        /** A page number within the paginated result set. */
        page?: number;
        /** Number of results to return per page. */
        page_size?: number;
      };
    };
    responses: {
      200: {
        schema: {
          count: number;
          /** Format: uri */
          next?: string;
          /** Format: uri */
          previous?: string;
          results: definitions["Game"][];
        };
      };
    };
  };
  "games_parent-games_list": {
    parameters: {
      path: {
        game_pk: string;
      };
      query: {
        /** A page number within the paginated result set. */
        page?: number;
        /** Number of results to return per page. */
        page_size?: number;
      };
    };
    responses: {
      200: {
        schema: {
          count: number;
          /** Format: uri */
          next?: string;
          /** Format: uri */
          previous?: string;
          results: definitions["Game"][];
        };
      };
    };
  };
  games_screenshots_list: {
    parameters: {
      path: {
        game_pk: string;
      };
      query: {
        /** Which field to use when ordering the results. */
        ordering?: string;
        /** A page number within the paginated result set. */
        page?: number;
        /** Number of results to return per page. */
        page_size?: number;
      };
    };
    responses: {
      200: {
        schema: {
          count: number;
          /** Format: uri */
          next?: string;
          /** Format: uri */
          previous?: string;
          results: definitions["ScreenShot"][];
        };
      };
    };
  };
  games_stores_list: {
    parameters: {
      path: {
        game_pk: string;
      };
      query: {
        /** Which field to use when ordering the results. */
        ordering?: string;
        /** A page number within the paginated result set. */
        page?: number;
        /** Number of results to return per page. */
        page_size?: number;
      };
    };
    responses: {
      200: {
        schema: {
          count: number;
          /** Format: uri */
          next?: string;
          /** Format: uri */
          previous?: string;
          results: definitions["GameStoreFull"][];
        };
      };
    };
  };
  games_read: {
    parameters: {
      path: {
        /** An ID or a slug identifying this Game. */
        id: string;
      };
    };
    responses: {
      200: {
        schema: definitions["GameSingle"];
      };
    };
  };
  games_achievements_read: {
    parameters: {
      path: {
        /** An ID or a slug identifying this Game. */
        id: string;
      };
    };
    responses: {
      200: {
        schema: definitions["ParentAchievement"];
      };
    };
  };
  games_movies_read: {
    parameters: {
      path: {
        /** An ID or a slug identifying this Game. */
        id: string;
      };
    };
    responses: {
      200: {
        schema: definitions["Movie"];
      };
    };
  };
  games_reddit_read: {
    parameters: {
      path: {
        /** An ID or a slug identifying this Game. */
        id: string;
      };
    };
    responses: {
      200: {
        schema: definitions["Reddit"];
      };
    };
  };
  games_suggested_read: {
    parameters: {
      path: {
        /** An ID or a slug identifying this Game. */
        id: string;
      };
    };
    responses: {
      200: {
        schema: definitions["GameSingle"];
      };
    };
  };
  games_twitch_read: {
    parameters: {
      path: {
        /** An ID or a slug identifying this Game. */
        id: string;
      };
    };
    responses: {
      200: {
        schema: definitions["Twitch"];
      };
    };
  };
  games_youtube_read: {
    parameters: {
      path: {
        /** An ID or a slug identifying this Game. */
        id: string;
      };
    };
    responses: {
      200: {
        schema: definitions["Youtube"];
      };
    };
  };
  genres_list: {
    parameters: {
      query: {
        /** Which field to use when ordering the results. */
        ordering?: string;
        /** A page number within the paginated result set. */
        page?: number;
        /** Number of results to return per page. */
        page_size?: number;
      };
    };
    responses: {
      200: {
        schema: {
          count: number;
          /** Format: uri */
          next?: string;
          /** Format: uri */
          previous?: string;
          results: definitions["Genre"][];
        };
      };
    };
  };
  genres_read: {
    parameters: {
      path: {
        /** A unique integer value identifying this Genre. */
        id: number;
      };
    };
    responses: {
      200: {
        schema: definitions["GenreSingle"];
      };
    };
  };
  platforms_list: {
    parameters: {
      query: {
        /** Which field to use when ordering the results. */
        ordering?: string;
        /** A page number within the paginated result set. */
        page?: number;
        /** Number of results to return per page. */
        page_size?: number;
      };
    };
    responses: {
      200: {
        schema: {
          count: number;
          /** Format: uri */
          next?: string;
          /** Format: uri */
          previous?: string;
          results: definitions["Platform"][];
        };
      };
    };
  };
  /** For instance, for PS2 and PS4 the “parent platform” is PlayStation. */
  platforms_lists_parents_list: {
    parameters: {
      query: {
        /** Which field to use when ordering the results. */
        ordering?: string;
        /** A page number within the paginated result set. */
        page?: number;
        /** Number of results to return per page. */
        page_size?: number;
      };
    };
    responses: {
      200: {
        schema: {
          count: number;
          /** Format: uri */
          next?: string;
          /** Format: uri */
          previous?: string;
          results: definitions["PlatformParentSingle"][];
        };
      };
    };
  };
  platforms_read: {
    parameters: {
      path: {
        /** A unique integer value identifying this Platform. */
        id: number;
      };
    };
    responses: {
      200: {
        schema: definitions["PlatformSingle"];
      };
    };
  };
  publishers_list: {
    parameters: {
      query: {
        /** A page number within the paginated result set. */
        page?: number;
        /** Number of results to return per page. */
        page_size?: number;
      };
    };
    responses: {
      200: {
        schema: {
          count: number;
          /** Format: uri */
          next?: string;
          /** Format: uri */
          previous?: string;
          results: definitions["Publisher"][];
        };
      };
    };
  };
  publishers_read: {
    parameters: {
      path: {
        /** A unique integer value identifying this Publisher. */
        id: number;
      };
    };
    responses: {
      200: {
        schema: definitions["PublisherSingle"];
      };
    };
  };
  stores_list: {
    parameters: {
      query: {
        /** Which field to use when ordering the results. */
        ordering?: string;
        /** A page number within the paginated result set. */
        page?: number;
        /** Number of results to return per page. */
        page_size?: number;
      };
    };
    responses: {
      200: {
        schema: {
          count: number;
          /** Format: uri */
          next?: string;
          /** Format: uri */
          previous?: string;
          results: definitions["Store"][];
        };
      };
    };
  };
  stores_read: {
    parameters: {
      path: {
        /** A unique integer value identifying this Store. */
        id: number;
      };
    };
    responses: {
      200: {
        schema: definitions["StoreSingle"];
      };
    };
  };
  tags_list: {
    parameters: {
      query: {
        /** A page number within the paginated result set. */
        page?: number;
        /** Number of results to return per page. */
        page_size?: number;
      };
    };
    responses: {
      200: {
        schema: {
          count: number;
          /** Format: uri */
          next?: string;
          /** Format: uri */
          previous?: string;
          results: definitions["Tag"][];
        };
      };
    };
  };
  tags_read: {
    parameters: {
      path: {
        /** A unique integer value identifying this Tag. */
        id: number;
      };
    };
    responses: {
      200: {
        schema: definitions["TagSingle"];
      };
    };
  };
};

export type external = {};
