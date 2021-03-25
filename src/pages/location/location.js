import React, { useRef } from 'react';
import Map from 'devextreme-react/map';
import './location.scss';
import {
  DataGrid,
  Column,
  ColumnChooser,
  SearchPanel,
  Selection,
} from 'devextreme-react/data-grid';
import TagBox from "devextreme-react/tag-box";
import { events } from './events';

export default () => {
  const keys = {
    bing: 'insert key here'
  };

  const mapContainer = useRef(null);

  const handleSelectionChanged = (e) => {
    const selectedRowKey = e.currentSelectedRowKeys[0];
    mapContainer.current.instance.option('center', selectedRowKey.Location);
    mapContainer.current.instance.option('zoom', 10);
  };

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
          <Map
            ref={mapContainer}
            defaultCenter='51.438108, -0.234025'
            autoAdjust={false}
            defaultZoom={10}
            apiKey={keys.bing}
            height={350}
            width="100%"
            provider="bing"
            type='roadmap'
            controls={true}
            markers={events.map(e => ({ location: e.Location, iconSrc: e.Icon }))}>
          </Map>
          <DataGrid
            dataSource={events}
            onSelectionChanged={handleSelectionChanged}>
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