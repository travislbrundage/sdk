/*
 * Copyright 2015-present Boundless Spatial Inc., http://boundlessgeo.com
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and limitations under the License.
 */

import GeocodingConstants from '../constants/GeocodingConstants';
import AppDispatcher from '../dispatchers/AppDispatcher';

export default {
  showSearchResult: (results) => {
    AppDispatcher.handleAction({
      type: GeocodingConstants.SHOW_SEARCH_RESULTS,
      searchResults: results
    });
  },
  clearSearchResult: () => {
    AppDispatcher.handleAction({
      type: GeocodingConstants.CLEAR_SEARCH_RESULT
    });
  },
  zoomToResult: (result) => {
    AppDispatcher.handleAction({
      type: GeocodingConstants.ZOOM_TO_RESULT,
      result: result
    });
  }
};
