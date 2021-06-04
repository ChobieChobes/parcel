import React, { useRef } from 'react';
import './Tree.scss';

import ResponsiveBox, {
  Row,
  Col,
  Item,
  Location
} from 'devextreme-react/responsive-box';

import TreeView from 'devextreme-react/tree-view';
import service from './tree-data.js';

import Toolbar, { Item as ToolItem } from 'devextreme-react/toolbar';
import notify from 'devextreme/ui/notify';

import { events } from './events';
import {
  DataGrid,
  Column,
  ColumnChooser,
  SearchPanel,
  Selection,
  Paging,
} from 'devextreme-react/data-grid';

import Map from 'devextreme-react/map';

import {
  Chart,
  Series,
  ArgumentAxis,
  CommonSeriesSettings,
  Export,
  Legend,
  Margin,
  Title,
  Subtitle,
  Tooltip,
  Grid,
  Size
} from 'devextreme-react/chart';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const products = service.getProducts();
  const countriesInfo = service.getCountriesInfo();
  const energySources = service.getEnergySources();

  function screen(width) {
    return (width < 800) ? 'sm' : 'lg';
  }

  const backButtonOptions = {
    type: 'back',
    onClick: () => {
      notify('Back button has been clicked!');
    }
  };
  
  const refreshButtonOptions = {
    icon: 'refresh',
    onClick: () => {
      notify('Refresh button has been clicked!');
    }
  };

  const addButtonOptions = {
    icon: 'plus',
    onClick: () => {
      notify('Add button has been clicked!');
    }
  };
  
  const saveButtonOptions = {
    text:'Save',
    onClick: () => {
      notify('Save option has been clicked!');
    }
  };
  
  const printButtonOptions = {
    text:'Print',
    onClick: () => {
      notify('Print option has been clicked!');
    }
  };
  
  const settingsButtonOptions = {
    text:'Settings',
    onClick: () => {
      notify('Settings option has been clicked!');
    }
  };

  const mapContainer = useRef(null);
  const keys = {
    bing: 'AvCdcugztsUAokSFDKz2pDmAQZWcgDwQ6fmFu0DsXmZBAa-k5FqS8PrRbeQmGm9G'
  };
  const handleSelectionChanged = (e) => {
    const selectedRowKey = e.currentSelectedRowKeys[0];
    mapContainer.current.instance.option('center', selectedRowKey.Location);
    mapContainer.current.instance.option('zoom', 10);
  };

  return (
    <React.Fragment>
          <ResponsiveBox
            singleColumnScreen="sm"
            screenByWidth={screen}>
            <Row ratio={1}></Row>
            <Row ratio={2} screen="xs"></Row>
            <Row ratio={2}></Row>
            <Row ratio={1}></Row>
            <Row ratio={1}></Row>

            <Col ratio={1}></Col>
            <Col ratio={4} screen="lg"></Col>
            <Item>
              <Location row={0} col={0} colspan={3} screen="lg"></Location>
              <Location row={0} col={0} colspan={2} screen="sm"></Location>
              <div className="tree-item">
                <Toolbar>
                <ToolItem location="before"
                  widget="dxButton"
                  options={addButtonOptions} />
                <ToolItem location="before"
                  widget="dxButton"
                  options={refreshButtonOptions} />
                <ToolItem location="before"
                  widget="dxButton"
                  options={backButtonOptions} />
                <ToolItem locateInMenu="always"
                  widget="dxButton"
                  options={saveButtonOptions} />
                <ToolItem locateInMenu="always"
                  widget="dxButton"
                  options={printButtonOptions} />
                <ToolItem locateInMenu="always"
                  widget="dxButton"
                  options={settingsButtonOptions} />
                </Toolbar>
              </div>
            </Item>
            <Item>
              <Location row={1} col={1} screen="lg" ></Location>
              <Location row={1} col={0} colspan={2} screen="sm" ></Location>
              <div className="tree-content tree-item">
                <Map
                  ref={mapContainer}
                  defaultCenter='55.078367, -2.278290'
                  autoAdjust={false}
                  defaultZoom={10}
                  apiKey={keys.bing}
                  height={400}
                  width="100%"
                  provider="bing"
                  type='roadmap'
                  controls={true}
                  markers={events.map(e => ({ location: e.Location, iconSrc: e.Icon }))}>
                </Map>
              </div>
            </Item>
            <Item>
              <Location row={1} col={0} rowspan={3} screen="lg"></Location>
              <Location row={2} col={0} screen="sm"></Location>
              <div className="tree-item">
                <TreeView id="simple-treeview"
                  items={products}
                  width={300} />
              </div>
            </Item>
            <Item>
              <Location row={2} col={1} colspan={3} screen="lg"></Location>
              <Location row={3} col={0} colspan={2} screen="sm"></Location>
              <div className="tree-footer tree-item">
                <DataGrid
                  onSelectionChanged={handleSelectionChanged}
                  dataSource={events}>
                  <Paging enabled={true} pageSize={5}/>
                  <SearchPanel visible={true} />
                  <Selection mode="single" />
                  <ColumnChooser enabled={true} />
                  <Column dataField="Date Time" dataType="date" />
                  <Column dataField="Identifier" />
                  <Column dataField="Location" />
                </DataGrid>
              </div>
            </Item>
            <Item>
              <Location row={3} col={1} colspan={3} screen="lg"></Location>
              <Location row={4} col={0} colspan={2} screen="sm"></Location>
              <div className="tree-footer tree-item">
                <Chart
                  palette="Ocean"
                  dataSource={countriesInfo}>
                  <Size height={175}/>
                  <CommonSeriesSettings
                    argumentField="country"
                    type="fullstackedline"/>
                  {
                    energySources.map(function(item) {
                      return <Series key={item.value} valueField={item.value} name={item.name} />;
                    })
                  }
                  <Margin bottom={20} />
                  <ArgumentAxis
                    valueMarginsEnabled={false}
                    discreteAxisDivisionMode="crossLabels">
                    <Grid visible={true} />
                  </ArgumentAxis>
                  <Legend visible={false}/>
                  <Export enabled={false} />
                  <Tooltip enabled={true} />
                </Chart>
              </div>
            </Item>
          </ResponsiveBox>
    </React.Fragment>
  );
}