import React from 'react';
import './location-esri.scss';
import {
  DataGrid,
  Column,
  ColumnChooser,
  SearchPanel,
  Selection,
} from 'devextreme-react/data-grid';
import TagBox from "devextreme-react/tag-box";
import { events } from './events';

import { Map as EsriMap } from '@esri/react-arcgis';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  return (
    <React.Fragment>
      <h2 className={'content-block'}>Location</h2>
      <div className={'content-block'}>
        <div className={'dx-card responsive-paddings'}>
          <div className={'search-dropdown'}>
            <TagBox
              items={events.map(e => e.Identifier)}
              searchEnabled={true}
              placeholder='Select parcel for tracking...'>
            </TagBox>
          </div>
          <div className={"esri-container"}>
            <EsriMap />
          </div>
          <DataGrid
            dataSource={events}>
            <SearchPanel visible={true} />
            <Selection mode="single" />
            <ColumnChooser enabled={true} />
            <Column dataField="Date Time" dataType="date" />
            <Column dataField="Identifier" />
            <Column dataField="Location" />
          </DataGrid>
        </div>
      </div>
    </React.Fragment >
  );
};