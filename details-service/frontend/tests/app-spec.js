import 'jsdom-global/register';
import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { configure, mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import App from '../build/staging/components/App.js';
import axios from 'axios';

configure({ adapter: new Adapter() });

describe('App Tests', () => {
  it(`should create object`, async () => {
    expect(App.prototype).to.not.be.null;
    console.log(App.prototype)
  });

  it(`should call component did mount`, async () => {
    // https://www.robinwieruch.de/react-testing-mocha-chai-enzyme-sinon
    sinon.spy(App.prototype, 'componentDidMount');
    console.log(App.prototype);
    const wrapper = mount(<App />);
    expect(App.prototype.componentDidMount.calledOnce).to.equal(true);
  })
});

describe('Content', () => {
  let wrapper;
  beforeEach(async () => {
    wrapper = mount(<App />)
    delete window.location
    window.location = new URL('http://localhost:8002/1')
    const instance = wrapper.instance();
    await instance.componentDidMount();
    await wrapper.update()
  })

  it(`should have a product details section`, async () => {
    const ProductDetails = wrapper.find(`ProductDetails`).find(`span`);
    expect(ProductDetails.at(0).text()).to.equal(`Details`)
    expect(typeof ProductDetails.at(1).text()).to.equal(`string`)
  });

  it(`should have a product features title & 6 Product Features`, async () => {
    const ProductFeaturesTitle = wrapper.find(`ProductFeatures`);
    const ProductFeaturesLi = ProductFeaturesTitle.find('ul').children();

    expect((ProductFeaturesTitle.find(`span`).text()).toUpperCase()).to.equal(`PRODUCT FEATURES`)
    expect(ProductFeaturesLi.length).to.equal(6);
    ProductFeaturesLi.forEach((li, i) => {
      expect(typeof ProductFeaturesLi.at(i).text()).to.equal('string');
    })
  });

  it(`should have a product descriptions title & 6 Product Descriptors`, async () => {
    const ProductDescriptionTitle = wrapper.find(`ProductDescription`).at(0);
    const ProductDescriptionStrong = ProductDescriptionTitle.find(`strong`);

    expect((ProductDescriptionTitle.find(`span`).at(0).text()).toUpperCase()).to.equal(`PRODUCT DESCRIPTION`)
    expect(ProductDescriptionStrong.length).to.equal(6);
    expect(ProductDescriptionStrong.at(0).text()).to.equal(`Article number: `);
    expect(ProductDescriptionStrong.at(1).text()).to.equal(`Activity: `);
    expect(ProductDescriptionStrong.at(2).text()).to.equal(`Family: `);
    expect(ProductDescriptionStrong.at(3).text()).to.equal(`Gender: `);
    expect(ProductDescriptionStrong.at(4).text()).to.equal(`Environmental information: `);
    expect(ProductDescriptionStrong.at(5).text()).to.equal(`Features: `);
  });

  it(`should have a material specification title & 4 Material Specifications`, async () => {
    const MaterialSpecTitle = wrapper.find(`ProductDescription`).at(1);
    const MaterialSpecStrong = MaterialSpecTitle.find(`strong`);
    expect(MaterialSpecStrong.length).to.equal(4);
    expect((MaterialSpecTitle.find(`span`).at(0).text()).toUpperCase()).to.equal(`MATERIAL SPECIFICATION`);
    expect(MaterialSpecStrong.at(0).text()).to.equal(`Material: `);
    expect(MaterialSpecStrong.at(1).text()).to.equal(`Lining: `);
    expect(MaterialSpecStrong.at(2).text()).to.equal(`Filling: `);
    expect(MaterialSpecStrong.at(3).text()).to.equal(`Legal notice: `);
  });

  it(`should have a technical details title and 7 technical details`, async () => {
    const TechnicalDetailsTitle = wrapper.find(`ProductDescription`).at(2);
    const TechnicalDetailsStrong = TechnicalDetailsTitle.find(`strong`);
    expect((TechnicalDetailsTitle.find(`span`).at(0).text()).toUpperCase()).to.equal(`TECHNICAL DETAILS`);
    expect(TechnicalDetailsStrong.at(0).text()).to.equal(`Weight: `);
    expect(TechnicalDetailsStrong.at(1).text()).to.equal(`Weight reference: `);
    expect(TechnicalDetailsStrong.at(2).text()).to.equal(`Model height: `);
    expect(TechnicalDetailsStrong.at(3).text()).to.equal(`Model size: `);
    //second column
    expect(TechnicalDetailsStrong.at(4).text()).to.equal(`Sleeve type: `);
    expect(TechnicalDetailsStrong.at(5).text()).to.equal(`Number of pockets: `);
    expect(TechnicalDetailsStrong.at(6).text()).to.equal(`Pockets: `);
  });

  it(`should have a care instructions title and 6 Care Instructions`, async () => {
    const CareInstructionsTitle = wrapper.find(`ProductDescription`).at(3);
    const CareInstructionsStrong = CareInstructionsTitle.find(`strong`);
    expect((CareInstructionsTitle.find(`span`).at(0).text()).toUpperCase()).to.equal(`CARE INSTRUCTIONS`);
    expect(CareInstructionsStrong.at(0).text()).to.equal(`Washing: `);
    expect(CareInstructionsStrong.at(1).text()).to.equal(`Dry cleaning: `);
    expect(CareInstructionsStrong.at(2).text()).to.equal(`Bleaching: `);
    expect(CareInstructionsStrong.at(3).text()).to.equal(`Drying: `);
    expect(CareInstructionsStrong.at(4).text()).to.equal(`Ironing: `);
    // second column
    expect(CareInstructionsStrong.at(5).text()).to.equal(`Additional care instructions: `);
  });
})
