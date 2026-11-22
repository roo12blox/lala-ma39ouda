import { FormEvent, useEffect, useState } from 'react';
import { CheckCircle2, ExternalLink, MapPin, Minus, Plus, ShoppingBag, Trash2, Truck, X } from 'lucide-react';
import { GLOVO_ZONES, Language, MenuItem } from '../data/menuData';

export interface CartEntry {
  key: string;
  item: MenuItem;
  sauce: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  lang: Language;
  entries: CartEntry[];
  selectedZoneId: string;
  onSelectZone: (zoneId: string) => void;
  onClose: () => void;
  onUpdateQty: (key: string, delta: number) => void;
  onRemove: (key: string) => void;
  onClearCart: () => void;
}

interface ConfirmedOrder {
  orderNumber: string;
  mode: 'glovo' | 'takeaway';
  customerName: string;
  phone: string;
  address: string;
  zoneName: string;
  eta: string;
  total: number;
  payment: 'cod' | 'card';
  items: CartEntry[];
}

export function CartDrawer({
  isOpen,
  lang,
  entries,
  selectedZoneId,
  onSelectZone,
  onClose,
  onUpdateQty,
  onRemove,
  onClearCart,
}: CartDrawerProps) {
  const [deliveryMode, setDeliveryMode] = useState<'glovo' | 'takeaway'>('glovo');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [payment, setPayment] = useState<'cod' | 'card'>('cod');
  const [formError, setFormError] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrder | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const zone = GLOVO_ZONES.find((z) => z.id === selectedZoneId) || GLOVO_ZONES[0];
  const subtotal = entries.reduce((sum, e) => sum + e.item.price * e.quantity, 0);
  const deliveryFee = deliveryMode === 'glovo' && entries.length > 0 ? zone.fee : 0;
  const total = subtotal + deliveryFee;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (entries.length === 0) return;

    if (!customerName.trim() || !phone.trim()) {
      setFormError(
        lang === 'fr'
          ? 'Veuillez renseigner votre nom et numéro de téléphone.'
          : 'عافاك عمر الاسم و رقم الهاتف.'
      );
      return;
    }

    if (deliveryMode === 'glovo' && !address.trim()) {
      setFormError(
        lang === 'fr'
          ? 'Veuillez indiquer votre rue ou repère à Meknès pour le livreur Glovo.'
          : 'عافاك كتب العنوان أو النعت في مكناس لليفرور ديال كلوفو.'
      );
      return;
    }

    setFormError('');
    const orderNum = `LM-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmedOrder({
      orderNumber: orderNum,
      mode: deliveryMode,
      customerName: customerName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      zoneName: zone.name,
      eta: deliveryMode === 'glovo' ? zone.eta : '15 min',
      total,
      payment,
      items: [...entries],
    });
    onClearCart();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-[3px]"
      role="dialog"
      aria-modal="true"
      aria-label={lang === 'fr' ? 'Panier et livraison Glovo' : 'سلة الطلبية و توصيل كلوفو'}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#181A1E] text-[#F5F5F4] h-full flex flex-col border-l border-white/10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#1F2227]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#FF5900]" aria-hidden="true" />
            <h2 className="font-display text-lg font-bold text-white">
              {lang === 'fr' ? 'Votre commande' : 'الطلبية ديالك'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={lang === 'fr' ? 'Fermer le panier' : 'إغلاق السلة'}
            className="p-2 -mr-2 rounded-lg text-[#A3A7B0] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {confirmedOrder ? (
            <div className="bg-[#1F2227] border border-white/12 rounded-xl p-6 space-y-5">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#00A082] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#00A082]">
                    {confirmedOrder.mode === 'glovo'
                      ? lang === 'fr'
                        ? 'Commande Glovo confirmée'
                        : 'تأكد طلب التوصيل عبر كلوفو'
                      : lang === 'fr'
                      ? 'Commande à emporter confirmée'
                      : 'تأكد الطلب للاستلام من المحل'}
                  </p>
                  <h3 className="font-display text-xl font-bold text-white mt-1 tabular-nums">
                    #{confirmedOrder.orderNumber}
                  </h3>
                  <p className="text-sm text-[#B0B4BC] mt-1">
                    {confirmedOrder.mode === 'glovo'
                      ? lang === 'fr'
                        ? `En préparation · Livreur Glovo estimé dans ${confirmedOrder.eta} (${confirmedOrder.zoneName}).`
                        : `كتوجد دابا · غادي توصل في ${confirmedOrder.eta} (${confirmedOrder.zoneName}).`
                      : lang === 'fr'
                      ? `Prête dans ${confirmedOrder.eta} au comptoir Lalla ma39ouda (VC5J+V7 Meknès).`
                      : `غتكون واجدة في ${confirmedOrder.eta} في محل لالة معقودة مكناس.`}
                  </p>
                </div>
              </div>

              <div className="border-t border-b border-white/10 py-3 space-y-2 text-sm">
                {confirmedOrder.items.map((entry) => (
                  <div key={entry.key} className="flex justify-between gap-2">
                    <span className="text-white">
                      {entry.quantity}× {entry.item.name[lang]} ({entry.sauce})
                    </span>
                    <span className="font-medium tabular-nums shrink-0 text-[#FF5900]">
                      {entry.item.price * entry.quantity} MAD
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between font-bold text-white">
                  <span>{lang === 'fr' ? 'Total à régler' : 'المجموع'}</span>
                  <span className="tabular-nums text-[#FFC244]">{confirmedOrder.total} MAD</span>
                </div>
                <p className="text-xs text-[#A3A7B0]">
                  {confirmedOrder.customerName} · {confirmedOrder.phone}
                  {confirmedOrder.address ? ` · ${confirmedOrder.address}` : ''}
                </p>
              </div>

              <div className="pt-2 flex flex-col gap-2.5">
                <a
                  href="https://glovoapp.com/ma/fr/meknes/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#FFC244] text-[#141413] text-sm font-bold hover:bg-[#F5B731] transition-colors"
                >
                  <span>{lang === 'fr' ? 'Suivre sur Glovo Meknès' : 'تتبع على تطبيق كلوفو'}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  type="button"
                  onClick={() => setConfirmedOrder(null)}
                  className="w-full px-4 py-2.5 rounded-lg border border-white/15 bg-[#16181B] text-sm font-medium text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  {lang === 'fr' ? 'Passer une autre commande' : 'دوز طلبية جديدة'}
                </button>
              </div>
            </div>
          ) : entries.length === 0 ? (
            <div className="text-center py-14 px-4">
              <p className="font-display text-lg font-bold text-white">
                {lang === 'fr' ? 'Votre panier est vide' : 'السلة خاوية دابا'}
              </p>
              <p className="text-sm text-[#A3A7B0] mt-1.5 max-w-xs mx-auto">
                {lang === 'fr'
                  ? 'Ajoutez une Ma39ouda, un Crispy Fried Chicken Bowl ou une Qechtouta depuis le menu.'
                  : 'زيد معقودة، تشيكن بول ولا قشطوطة من المينيو باش تطلب.'}
              </p>
              <a
                href="#menu"
                onClick={onClose}
                className="inline-flex items-center justify-center mt-5 px-5 py-2.5 rounded-lg bg-[#FF5900] text-white text-sm font-semibold hover:bg-[#E04E00] transition-colors"
              >
                {lang === 'fr' ? 'Voir le menu' : 'شوف المينيو'}
              </a>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-2 p-1 bg-[#141619] border border-white/10 rounded-xl">
                <button
                  type="button"
                  onClick={() => setDeliveryMode('glovo')}
                  className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    deliveryMode === 'glovo'
                      ? 'bg-[#FFC244] text-[#141413] shadow-sm'
                      : 'text-[#B0B4BC] hover:text-white'
                  }`}
                >
                  <Truck className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{lang === 'fr' ? 'Livraison Glovo' : 'توصيل كلوفو'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDeliveryMode('takeaway')}
                  className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    deliveryMode === 'takeaway'
                      ? 'bg-[#FF5900] text-white shadow-sm'
                      : 'text-[#B0B4BC] hover:text-white'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{lang === 'fr' ? 'À emporter' : 'استلام في المحل'}</span>
                </button>
              </div>

              <div className="space-y-3">
                {entries.map((entry) => (
                  <div
                    key={entry.key}
                    className="bg-[#1F2227] border border-white/10 rounded-xl p-3.5 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white truncate">
                        {entry.item.name[lang]}
                      </p>
                      <p className="text-xs text-[#A3A7B0] mt-0.5">
                        {entry.sauce} ·{' '}
                        <span className="tabular-nums font-semibold text-[#FF5900]">
                          {entry.item.price * entry.quantity} MAD
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => onUpdateQty(entry.key, -1)}
                        aria-label="Retirer un"
                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/12 hover:bg-white/10 text-white cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center text-xs font-semibold tabular-nums text-white">
                        {entry.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQty(entry.key, 1)}
                        aria-label="Ajouter un"
                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/12 hover:bg-white/10 text-white cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onRemove(entry.key)}
                        aria-label="Supprimer"
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-[#A3A7B0] hover:text-[#FF5900] hover:bg-white/10 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {deliveryMode === 'glovo' && (
                <div className="bg-[#1F2227] border border-white/10 rounded-xl p-4 space-y-2.5">
                  <label
                    htmlFor="glovo-zone-select"
                    className="block text-xs font-semibold text-white"
                  >
                    {lang === 'fr' ? 'Quartier de livraison à Meknès (Glovo)' : 'الحي في مكناس (توصيل كلوفو)'}
                  </label>
                  <select
                    id="glovo-zone-select"
                    value={selectedZoneId}
                    onChange={(e) => onSelectZone(e.target.value)}
                    className="w-full rounded-lg border border-white/15 bg-[#141619] px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#FFC244]"
                  >
                    {GLOVO_ZONES.map((z) => (
                      <option key={z.id} value={z.id}>
                        {z.name} ({z.eta} · +{z.fee} MAD)
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <form id="checkout-form" onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="cust-name" className="block text-xs font-medium text-[#B0B4BC] mb-1">
                      {lang === 'fr' ? 'Nom complet' : 'الاسم الكامل'}
                    </label>
                    <input
                      id="cust-name"
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Ex: Nadia Bennani"
                      className="w-full rounded-lg border border-white/15 bg-[#141619] px-3 py-2 text-sm text-white placeholder:text-[#6B707A] focus:outline-none focus:ring-2 focus:ring-[#FF5900]"
                    />
                  </div>
                  <div>
                    <label htmlFor="cust-phone" className="block text-xs font-medium text-[#B0B4BC] mb-1">
                      {lang === 'fr' ? 'Téléphone' : 'رقم الهاتف'}
                    </label>
                    <input
                      id="cust-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="06 / 07 ..."
                      className="w-full rounded-lg border border-white/15 bg-[#141619] px-3 py-2 text-sm text-white placeholder:text-[#6B707A] focus:outline-none focus:ring-2 focus:ring-[#FF5900]"
                    />
                  </div>
                </div>

                {deliveryMode === 'glovo' && (
                  <div>
                    <label htmlFor="cust-address" className="block text-xs font-medium text-[#B0B4BC] mb-1">
                      {lang === 'fr' ? 'Adresse / Repère à Meknès' : 'العنوان بالتفصيل في مكناس'}
                    </label>
                    <input
                      id="cust-address"
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Ex: Avenue Mohammed VI, Imm. 12, Appt 4"
                      className="w-full rounded-lg border border-white/15 bg-[#141619] px-3 py-2 text-sm text-white placeholder:text-[#6B707A] focus:outline-none focus:ring-2 focus:ring-[#FF5900]"
                    />
                  </div>
                )}

                <div>
                  <p className="text-xs font-medium text-[#B0B4BC] mb-1.5">
                    {lang === 'fr' ? 'Paiement' : 'طريقة الأداء'}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPayment('cod')}
                      className={`py-2 px-3 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                        payment === 'cod'
                          ? 'bg-white text-[#141413] border-white'
                          : 'bg-[#141619] text-[#B0B4BC] border-white/15 hover:text-white'
                      }`}
                    >
                      {lang === 'fr' ? 'Espèces à la livraison' : 'الدفع عند الاستلام'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setPayment('card')}
                      className={`py-2 px-3 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                        payment === 'card'
                          ? 'bg-white text-[#141413] border-white'
                          : 'bg-[#141619] text-[#B0B4BC] border-white/15 hover:text-white'
                      }`}
                    >
                      {lang === 'fr' ? 'Carte bancaire (Glovo)' : 'بطاقة بنكية (كلوفو)'}
                    </button>
                  </div>
                </div>

                {formError && (
                  <p role="alert" className="text-xs font-medium text-[#FF5900]">
                    {formError}
                  </p>
                )}
              </form>
            </>
          )}
        </div>

        {!confirmedOrder && entries.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-[#1F2227] space-y-3">
            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-[#B0B4BC]">
                <span>{lang === 'fr' ? 'Sous-total plats' : 'مجموع الأطباق'}</span>
                <span className="tabular-nums text-white">{subtotal} MAD</span>
              </div>
              <div className="flex justify-between text-[#B0B4BC]">
                <span>
                  {deliveryMode === 'glovo'
                    ? `${lang === 'fr' ? 'Livraison Glovo' : 'توصيل كلوفو'} (${zone.eta})`
                    : lang === 'fr'
                    ? 'Retrait comptoir'
                    : 'استلام من المحل'}
                </span>
                <span className="tabular-nums text-white">
                  {deliveryFee === 0 ? 'Gratuit' : `${deliveryFee} MAD`}
                </span>
              </div>
              <div className="flex justify-between font-bold text-base text-white pt-1.5 border-t border-white/10">
                <span>{lang === 'fr' ? 'Total' : 'المجموع النهائي'}</span>
                <span className="tabular-nums text-[#FFC244]">{total} MAD</span>
              </div>
            </div>

            <button
              type="submit"
              form="checkout-form"
              className={`w-full py-3 px-4 rounded-xl text-sm font-bold transition-all active:scale-[0.99] cursor-pointer ${
                deliveryMode === 'glovo'
                  ? 'bg-[#FFC244] text-[#141413] hover:bg-[#F5B731]'
                  : 'bg-[#FF5900] text-white hover:bg-[#E04E00]'
              }`}
            >
              {deliveryMode === 'glovo'
                ? lang === 'fr'
                  ? `Commander via Glovo · ${total} MAD`
                  : `تأكيد توصيل كلوفو · ${total} درهم`
                : lang === 'fr'
                ? `Valider à emporter · ${total} MAD`
                : `تأكيد الاستلام من المحل · ${total} درهم`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
