import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './invoice.reducer';
import { IInvoice } from 'app/shared/model/invoice/invoice.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IInvoiceProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IInvoiceState = IPaginationBaseState;

export class Invoice extends React.Component<IInvoiceProps, IInvoiceState> {
  state: IInvoiceState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.getEntities();
  }

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => this.sortEntities()
    );
  };

  sortEntities() {
    this.getEntities();
    this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}`);
  }

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { invoiceList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="invoice-heading">
          <Translate contentKey="storeApp.invoiceInvoice.home.title">Invoices</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="storeApp.invoiceInvoice.home.createLabel">Create a new Invoice</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {invoiceList && invoiceList.length > 0 ? (
            <Table responsive aria-describedby="invoice-heading">
              <thead>
                <tr>
                  <th className="hand" onClick={this.sort('id')}>
                    <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('code')}>
                    <Translate contentKey="storeApp.invoiceInvoice.code">Code</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('date')}>
                    <Translate contentKey="storeApp.invoiceInvoice.date">Date</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('details')}>
                    <Translate contentKey="storeApp.invoiceInvoice.details">Details</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('status')}>
                    <Translate contentKey="storeApp.invoiceInvoice.status">Status</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('paymentMethod')}>
                    <Translate contentKey="storeApp.invoiceInvoice.paymentMethod">Payment Method</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('paymentDate')}>
                    <Translate contentKey="storeApp.invoiceInvoice.paymentDate">Payment Date</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('paymentAmount')}>
                    <Translate contentKey="storeApp.invoiceInvoice.paymentAmount">Payment Amount</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {invoiceList.map((invoice, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${invoice.id}`} color="link" size="sm">
                        {invoice.id}
                      </Button>
                    </td>
                    <td>{invoice.code}</td>
                    <td>
                      <TextFormat type="date" value={invoice.date} format={APP_DATE_FORMAT} />
                    </td>
                    <td>{invoice.details}</td>
                    <td>
                      <Translate contentKey={`storeApp.InvoiceStatus.${invoice.status}`} />
                    </td>
                    <td>
                      <Translate contentKey={`storeApp.PaymentMethod.${invoice.paymentMethod}`} />
                    </td>
                    <td>
                      <TextFormat type="date" value={invoice.paymentDate} format={APP_DATE_FORMAT} />
                    </td>
                    <td>{invoice.paymentAmount}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${invoice.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${invoice.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${invoice.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">
              <Translate contentKey="storeApp.invoiceInvoice.home.notFound">No Invoices found</Translate>
            </div>
          )}
        </div>
        <div className={invoiceList && invoiceList.length > 0 ? '' : 'd-none'}>
          <Row className="justify-content-center">
            <JhiItemCount page={this.state.activePage} total={totalItems} itemsPerPage={this.state.itemsPerPage} i18nEnabled />
          </Row>
          <Row className="justify-content-center">
            <JhiPagination
              activePage={this.state.activePage}
              onSelect={this.handlePagination}
              maxButtons={5}
              itemsPerPage={this.state.itemsPerPage}
              totalItems={this.props.totalItems}
            />
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ invoice }: IRootState) => ({
  invoiceList: invoice.entities,
  totalItems: invoice.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Invoice);
