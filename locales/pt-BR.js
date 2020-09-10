import pt from 'vuetify/es5/locale/pt'

const dashboard = 'Painel'
const core = 'Cadastros'
const inventory = 'Inventário'
const sale = 'Vendas'
const accounting = 'Financeiro'
const report = 'Relatórios'

const federative_unit = 'Unidade federativa'
const federative_units = 'Unidades federativas'
const city = 'Cidade'
const cities = 'Cidades'
const person = 'Cliente / Fornecedor'
const persons = 'Clientes / Fornecedores'
const unit_of_measure = 'Unidade de medida'
const units_of_measure = 'Unidades de medida'
const category = 'Categoria de produto'
const categories = 'Categorias de produto'
const subcategory = 'Subcategoria de produto'
const subcategories = 'Subcategorias de produto'
const product_size_register = 'Grade de produto'
const product_size_registers = 'Grades de produto'
const packaging_type = 'Tipo de embalagem'
const packaging_types = 'Tipos de embalagem'
const product = 'Produto'
const products = 'Produtos'

const sale_order = 'Pedido'
const sale_orders = 'Pedidos'

const sales_by_product = 'Vendas por Produto'

// Accounting
const accounting_account_payable = 'Conta a pagar'
const accounting_accounts_payable = 'Contas a pagar'
const accounting_category = 'Categoria financeira'
const accounting_categories = 'Categorias financeiras'
const accounting_deposit_account = 'Conta financeira'
const accounting_deposit_accounts = 'Contas financeiras'
const accounting_classification_center = 'Centro de Custo/Despesa'
const accounting_classification_centers = 'Centros de Custo/Despesa'

const accounts_payable_by_due_date = 'Despesas por vencimento'

export default {
  $vuetify: pt,

  'company.name': 'ConTTudOweb',
  avatar: 'ConTTudO <web/>',
  search: 'Pesquisar',
  'add-row': 'Adicionar...',

  // menus
  'Dashboard___pt': dashboard,
  'menu.dashboard': dashboard,
  'menu.core': core,
  'menu.inventory': inventory,
  'menu.sale': sale,
  'menu.accounting': accounting,
  'menu.report': report,

  'core-federative-unit___pt': federative_units,
  'core-federative-unit-id___pt': federative_unit,
  'menu.core.federative-units': federative_units,
  'core-city___pt': cities,
  'core-city-id___pt': city,
  'menu.core.cities': cities,
  'core-person___pt': persons,
  'core-person-id___pt': person,
  'menu.core.persons': persons,
  'inventory-unit-of-measure___pt': units_of_measure,
  'inventory-unit-of-measure-id___pt': unit_of_measure,
  'menu.inventory.units-of-measure': units_of_measure,
  'inventory-category___pt': categories,
  'inventory-category-id___pt': category,
  'menu.inventory.categories': categories,
  'inventory-subcategory___pt': subcategories,
  'inventory-subcategory-id___pt': subcategory,
  'menu.inventory.subcategories': subcategories,
  'inventory-product-size-register___pt': product_size_registers,
  'inventory-product-size-register-id___pt': product_size_register,
  'menu.inventory.product-size-registers': product_size_registers,
  'inventory-packaging-type___pt': packaging_types,
  'inventory-packaging-type-id___pt': packaging_type,
  'menu.inventory.packaging-types': packaging_types,
  'product-sizes': 'Itens da Grade',
  'inventory-product___pt': products,
  'inventory-product-id___pt': product,
  'menu.inventory.products': products,
  'product-by-supplier': 'Referências por Fornecedor',
  'packaging': 'Embalagens',

  'sale-sale-order___pt': sale_orders,
  'sale-sale-order-id___pt': sale_order,
  'menu.sale.sale-orders': sale_orders,
  'sale-order-items': 'Itens do Pedido',

  'report-sales-by-product___pt': sales_by_product,
  'menu.report.sales-by-product': sales_by_product,

  // Accounting
  'menu.accounting.account-payable': accounting_accounts_payable,
  'accounting-account-payable___pt': accounting_accounts_payable,
  'accounting-account-payable-id___pt': accounting_account_payable,
  //
  'menu.accounting.category': accounting_categories,
  'accounting-category___pt': accounting_categories,
  'accounting-category-id___pt': accounting_category,
  //
  'menu.accounting.deposit-account': accounting_deposit_accounts,
  'accounting-deposit-account___pt': accounting_deposit_accounts,
  'accounting-deposit-account-id___pt': accounting_deposit_account,
  //
  'menu.accounting.classification-centers': accounting_classification_centers,
  'accounting-classification-center___pt': accounting_classification_centers,
  'accounting-classification-center-id___pt': accounting_classification_center,
  //
  'report-accounts-payable-by-due-date___pt': accounts_payable_by_due_date,
  'menu.report.accounts-payable-by-due-date': accounts_payable_by_due_date,

  // terms
  'about-us': 'Sobre nós',
  'made-with': 'feito com',
  'by': 'por',
  'new-item': 'Adicionar',
  'edit-item': 'Modificar',
  'logout': 'Sair'
}
