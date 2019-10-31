import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown icon="th-list" name={translate('global.menu.entities.main')} id="entity-menu">
    <MenuItem icon="asterisk" to="/entity/product">
      <Translate contentKey="global.menu.entities.product" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/product-category">
      <Translate contentKey="global.menu.entities.productCategory" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/customer">
      <Translate contentKey="global.menu.entities.customer" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/product-order">
      <Translate contentKey="global.menu.entities.productOrder" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/order-item">
      <Translate contentKey="global.menu.entities.orderItem" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/invoice">
      <Translate contentKey="global.menu.entities.invoiceInvoice" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/shipment">
      <Translate contentKey="global.menu.entities.invoiceShipment" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/notification">
      <Translate contentKey="global.menu.entities.notificationNotification" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
