import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICustomer } from 'app/shared/model/customer.model';
import { getEntities as getCustomers } from 'app/entities/customer/customer.reducer';
import { getEntity, updateEntity, createEntity, reset } from './product-order.reducer';
import { IProductOrder } from 'app/shared/model/product-order.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProductOrderUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IProductOrderUpdateState {
  isNew: boolean;
  customerId: string;
}

export class ProductOrderUpdate extends React.Component<IProductOrderUpdateProps, IProductOrderUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      customerId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getCustomers();
  }

  saveEntity = (event, errors, values) => {
    values.placedDate = convertDateTimeToServer(values.placedDate);

    if (errors.length === 0) {
      const { productOrderEntity } = this.props;
      const entity = {
        ...productOrderEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/product-order');
  };

  render() {
    const { productOrderEntity, customers, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="storeApp.productOrder.home.createOrEditLabel">
              <Translate contentKey="storeApp.productOrder.home.createOrEditLabel">Create or edit a ProductOrder</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : productOrderEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="product-order-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="product-order-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="placedDateLabel" for="product-order-placedDate">
                    <Translate contentKey="storeApp.productOrder.placedDate">Placed Date</Translate>
                  </Label>
                  <AvInput
                    id="product-order-placedDate"
                    type="datetime-local"
                    className="form-control"
                    name="placedDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.productOrderEntity.placedDate)}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel" for="product-order-status">
                    <Translate contentKey="storeApp.productOrder.status">Status</Translate>
                  </Label>
                  <AvInput
                    id="product-order-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && productOrderEntity.status) || 'COMPLETED'}
                  >
                    <option value="COMPLETED">{translate('storeApp.OrderStatus.COMPLETED')}</option>
                    <option value="PENDING">{translate('storeApp.OrderStatus.PENDING')}</option>
                    <option value="CANCELLED">{translate('storeApp.OrderStatus.CANCELLED')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="codeLabel" for="product-order-code">
                    <Translate contentKey="storeApp.productOrder.code">Code</Translate>
                  </Label>
                  <AvField
                    id="product-order-code"
                    type="text"
                    name="code"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="invoiceIdLabel" for="product-order-invoiceId">
                    <Translate contentKey="storeApp.productOrder.invoiceId">Invoice Id</Translate>
                  </Label>
                  <AvField id="product-order-invoiceId" type="string" className="form-control" name="invoiceId" />
                </AvGroup>
                <AvGroup>
                  <Label for="product-order-customer">
                    <Translate contentKey="storeApp.productOrder.customer">Customer</Translate>
                  </Label>
                  <AvInput
                    id="product-order-customer"
                    type="select"
                    className="form-control"
                    name="customer.id"
                    value={isNew ? customers[0] && customers[0].id : productOrderEntity.customer.id}
                    required
                  >
                    {customers
                      ? customers.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.email}
                          </option>
                        ))
                      : null}
                  </AvInput>
                  <AvFeedback>
                    <Translate contentKey="entity.validation.required">This field is required.</Translate>
                  </AvFeedback>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/product-order" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  customers: storeState.customer.entities,
  productOrderEntity: storeState.productOrder.entity,
  loading: storeState.productOrder.loading,
  updating: storeState.productOrder.updating,
  updateSuccess: storeState.productOrder.updateSuccess
});

const mapDispatchToProps = {
  getCustomers,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductOrderUpdate);
