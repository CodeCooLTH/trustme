import PageBreadcrumb from '@/components/PageBreadcrumb'
import Icon from '@/components/wrappers/Icon'
export const metadata = {
  title: 'FAQS',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="FAQS" subtitle="Pages" />

      <div className="mx-auto 2xl:w-5/6">
        <div className="mb-18">
          <div className="text-center">
            <div className="mb-5 flex justify-center">
              <Icon icon="help-hexagon" className="text-primary size-7" />
            </div>
            <h3 className="mb-2.5 text-xl font-semibold">Need Help with Something?</h3>
            <p className="text-default-400 mx-auto mb-7.5 w-130">We&apos;re here to assist you with any technical questions, account issues, or feedback. Reach out to our support team — we’ll get back to you as soon as possible!</p>
            <div className="flex items-center justify-center gap-3">
              <a href="mailto:support@example.com" className="btn bg-success text-white hover:bg-success-hover">
                <Icon icon="mail" className="text-base" />
                Contact Support
              </a>
              <a href="https://twitter.com/intent/tweet?text=Hello+Support" target="_blank" className="btn bg-primary text-white hover:bg-primary-hover">
                <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                </svg>
                Tweet to Us
              </a>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-base">
          <div className="card">
            <div className="card-header block">
              <h4 className="card-title mb-1.25">General</h4>
              <p className="text-default-400">Here are some common questions about our templates.</p>
            </div>
            <div className="card-body">
              <div className="hs-accordion-group flex flex-col gap-2">
                <div className="hs-accordion" id="BorderedheadingOne">
                  <button
                    className="hs-accordion-toggle bg-default-100 font-secondary flex w-full items-center justify-between rounded px-5 py-4 text-start text-sm font-semibold disabled:pointer-events-none disabled:opacity-50"
                    aria-expanded="true"
                    aria-controls="BorderedcollapseOne"
                  >
                    What is included in your template purchase?
                    <Icon icon="chevron-down" className="hs-accordion-active:rotate-180 transition-transform text-base" />
                  </button>
                  <div id="BorderedcollapseOne" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="BorderedheadingOne">
                    <div className="px-5 py-4">Our templates come with clean source code, comprehensive documentation, SCSS files, and starter project setups for various frameworks (e.g., React, Angular, Laravel).</div>
                  </div>
                </div>
                <div className="hs-accordion" id="BorderedheadingTwo">
                  <button
                    className="hs-accordion-toggle bg-default-100 font-secondary flex w-full items-center justify-between rounded px-5 py-4 text-start text-sm font-semibold disabled:pointer-events-none disabled:opacity-50"
                    aria-expanded="true"
                    aria-controls="BorderedcollapseTwo"
                  >
                    Do you offer support after purchase?
                    <Icon icon="chevron-down" className="hs-accordion-active:rotate-180 transition-transform text-base" />
                  </button>
                  <div id="BorderedcollapseTwo" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="BorderedheadingTwo">
                    <div className="px-5 py-4">Yes! We provide 6 months of free support for bug fixes, usage questions, and minor updates. You can also extend support if needed.</div>
                  </div>
                </div>
                <div className="hs-accordion" id="BorderedheadingThree">
                  <button
                    className="hs-accordion-toggle bg-default-100 font-secondary flex w-full items-center justify-between rounded px-5 py-4 text-start text-sm font-semibold disabled:pointer-events-none disabled:opacity-50"
                    aria-expanded="true"
                    aria-controls="BorderedcollapseThree"
                  >
                    Can I use the template for multiple projects?
                    <Icon icon="chevron-down" className="hs-accordion-active:rotate-180 transition-transform text-base" />
                  </button>
                  <div id="BorderedcollapseThree" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="BorderedheadingThree">
                    <div className="px-5 py-4">The standard license allows use in a single end product. For multiple projects, a separate license is required for each use case.</div>
                  </div>
                </div>
                <div className="hs-accordion" id="BorderedheadingFour">
                  <button
                    className="hs-accordion-toggle bg-default-100 font-secondary flex w-full items-center justify-between rounded px-5 py-4 text-start text-sm font-semibold disabled:pointer-events-none disabled:opacity-50"
                    aria-expanded="true"
                    aria-controls="BorderedcollapseFour"
                  >
                    Are the templates compatible with the latest frameworks?
                    <Icon icon="chevron-down" className="hs-accordion-active:rotate-180 transition-transform text-base" />
                  </button>
                  <div id="BorderedcollapseFour" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="BorderedheadingFour">
                    <div className="px-5 py-4">Yes, we regularly update our templates to ensure compatibility with the latest versions of frameworks like TailwindCSS, React, Angular, Laravel, and others.</div>
                  </div>
                </div>
                <div className="hs-accordion" id="BorderedheadingFive">
                  <button
                    className="hs-accordion-toggle bg-default-100 font-secondary flex w-full items-center justify-between rounded px-5 py-4 text-start text-sm font-semibold disabled:pointer-events-none disabled:opacity-50"
                    aria-expanded="true"
                    aria-controls="BorderedcollapseFive"
                  >
                    Do you provide Figma or design files?
                    <Icon icon="chevron-down" className="hs-accordion-active:rotate-180 transition-transform text-base" />
                  </button>
                  <div id="BorderedcollapseFive" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="BorderedheadingFive">
                    <div className="px-5 py-4">Yes, we include Figma or design source files with selected templates. Please check the product details or contact us if unsure.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header block">
              <h4 className="card-title mb-1">Payments</h4>
              <p className="text-default-400">Here are some common questions related to billing and payment.</p>
            </div>
            <div className="card-body">
              <div className="hs-accordion-group flex flex-col gap-2">
                <div className="hs-accordion" id="paymentHeadingOne">
                  <button
                    className="hs-accordion-toggle bg-default-100 font-secondary flex w-full items-center justify-between rounded px-5 py-4 text-start text-sm font-semibold disabled:pointer-events-none disabled:opacity-50"
                    aria-expanded="true"
                    aria-controls="paymentCollapseOne"
                  >
                    What payment methods do you accept?
                    <Icon icon="chevron-down" className="hs-accordion-active:rotate-180 transition-transform text-base" />
                  </button>
                  <div id="paymentCollapseOne" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="paymentHeadingOne">
                    <div className="px-5 py-4">We accept all major credit/debit cards, PayPal, and Stripe payments. Some marketplaces may support additional methods.</div>
                  </div>
                </div>
                <div className="hs-accordion" id="paymentHeadingTwo">
                  <button
                    className="hs-accordion-toggle bg-default-100 font-secondary flex w-full items-center justify-between rounded px-5 py-4 text-start text-sm font-semibold disabled:pointer-events-none disabled:opacity-50"
                    aria-expanded="true"
                    aria-controls="paymentCollapseTwo"
                  >
                    Will I receive an invoice after purchase?
                    <Icon icon="chevron-down" className="hs-accordion-active:rotate-180 transition-transform text-base" />
                  </button>
                  <div id="paymentCollapseTwo" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="paymentHeadingTwo">
                    <div className="px-5 py-4">Yes, you will receive an official invoice or receipt via email immediately after your purchase is completed.</div>
                  </div>
                </div>
                <div className="hs-accordion" id="paymentHeadingThree">
                  <button
                    className="hs-accordion-toggle bg-default-100 font-secondary flex w-full items-center justify-between rounded px-5 py-4 text-start text-sm font-semibold disabled:pointer-events-none disabled:opacity-50"
                    aria-expanded="true"
                    aria-controls="paymentCollapseThree"
                  >
                    Is there a refund policy?
                    <Icon icon="chevron-down" className="hs-accordion-active:rotate-180 transition-transform text-base" />
                  </button>
                  <div id="paymentCollapseThree" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="paymentHeadingThree">
                    <div className="px-5 py-4">Yes, we follow the refund policy of the marketplace where the item was purchased. Please refer to their refund terms or contact us directly if unsure.</div>
                  </div>
                </div>
                <div className="hs-accordion" id="paymentHeadingFour">
                  <button
                    className="hs-accordion-toggle bg-default-100 font-secondary flex w-full items-center justify-between rounded px-5 py-4 text-start text-sm font-semibold disabled:pointer-events-none disabled:opacity-50"
                    aria-expanded="true"
                    aria-controls="paymentCollapseFour"
                  >
                    Can I upgrade my license later?
                    <Icon icon="chevron-down" className="hs-accordion-active:rotate-180 transition-transform text-base" />
                  </button>
                  <div id="paymentCollapseFour" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="paymentHeadingFour">
                    <div className="px-5 py-4">absolutely! You can upgrade your license at any time by contacting support or purchasing the extended license separately.</div>
                  </div>
                </div>
                <div className="hs-accordion" id="paymentHeadingFive">
                  <button
                    className="hs-accordion-toggle bg-default-100 font-secondary flex w-full items-center justify-between rounded px-5 py-4 text-start text-sm font-semibold disabled:pointer-events-none disabled:opacity-50"
                    aria-expanded="true"
                    aria-controls="paymentCollapseFive"
                  >
                    Why was my payment declined?
                    <Icon icon="chevron-down" className="hs-accordion-active:rotate-180 transition-transform text-base" />
                  </button>
                  <div id="paymentCollapseFive" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="paymentHeadingFive">
                    <div className="px-5 py-4">Payment failures may occur due to incorrect card info, insufficient funds, or bank restrictions. Please try another method or contact your provider.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header block">
              <h4 className="card-title mb-1">Refunds</h4>
              <p className="text-default-400">Find answers related to our refund policy and conditions.</p>
            </div>
            <div className="card-body">
              <div className="hs-accordion-group flex flex-col gap-2">
                <div className="hs-accordion" id="refundHeadingOne">
                  <button
                    className="hs-accordion-toggle bg-default-100 font-secondary flex w-full items-center justify-between rounded px-5 py-4 text-start text-sm font-semibold disabled:pointer-events-none disabled:opacity-50"
                    aria-expanded="true"
                    aria-controls="refundCollapseOne"
                  >
                    What is your refund policy?
                    <Icon icon="chevron-down" className="hs-accordion-active:rotate-180 transition-transform text-base" />
                  </button>
                  <div id="refundCollapseOne" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="refundHeadingOne">
                    <div className="px-5 py-4">We offer refunds within 14 days of purchase if the template is faulty or not as described. Please review the full policy or reach out for clarification.</div>
                  </div>
                </div>
                <div className="hs-accordion" id="refundHeadingTwo">
                  <button
                    className="hs-accordion-toggle bg-default-100 font-secondary flex w-full items-center justify-between rounded px-5 py-4 text-start text-sm font-semibold disabled:pointer-events-none disabled:opacity-50"
                    aria-expanded="true"
                    aria-controls="refundCollapseTwo"
                  >
                    How do I request a refund?
                    <Icon icon="chevron-down" className="hs-accordion-active:rotate-180 transition-transform text-base" />
                  </button>
                  <div id="refundCollapseTwo" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="refundHeadingTwo">
                    <div className="px-5 py-4">You can request a refund by contacting our support team with your order ID and a brief reason for the request.</div>
                  </div>
                </div>
                <div className="hs-accordion" id="refundHeadingThree">
                  <button
                    className="hs-accordion-toggle bg-default-100 font-secondary flex w-full items-center justify-between rounded px-5 py-4 text-start text-sm font-semibold disabled:pointer-events-none disabled:opacity-50"
                    aria-expanded="true"
                    aria-controls="refundCollapseThree"
                  >
                    Are there any non-refundable purchases?
                    <Icon icon="chevron-down" className="hs-accordion-active:rotate-180 transition-transform text-base" />
                  </button>
                  <div id="refundCollapseThree" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="refundHeadingThree">
                    <div className="px-5 py-4">Custom services, extended licenses, and downloadable assets with confirmed usage typically aren’t refundable.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header block">
              <h4 className="card-title mb-1.25">Customization</h4>
              <p className="text-default-400">Questions about custom development and template modifications.</p>
            </div>
            <div className="card-body">
              <div className="hs-accordion-group flex flex-col gap-2">
                <div className="hs-accordion" id="customHeadingOne">
                  <button
                    className="hs-accordion-toggle bg-default-100 font-secondary flex w-full items-center justify-between rounded px-5 py-4 text-start text-sm font-semibold disabled:pointer-events-none disabled:opacity-50"
                    aria-expanded="true"
                    aria-controls="customCollapseOne"
                  >
                    Do you offer customization services?
                    <Icon icon="chevron-down" className="hs-accordion-active:rotate-180 transition-transform text-base" />
                  </button>
                  <div id="customCollapseOne" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="customHeadingOne">
                    <div className="px-5 py-4">Yes, we offer paid customization services based on your requirements. Contact us for a quote.</div>
                  </div>
                </div>
                <div className="hs-accordion" id="customHeadingTwo">
                  <button
                    className="hs-accordion-toggle bg-default-100 font-secondary flex w-full items-center justify-between rounded px-5 py-4 text-start text-sm font-semibold disabled:pointer-events-none disabled:opacity-50"
                    aria-expanded="true"
                    aria-controls="customCollapseTwo"
                  >
                    Can I modify the template myself?
                    <Icon icon="chevron-down" className="hs-accordion-active:rotate-180 transition-transform text-base" />
                  </button>
                  <div id="customCollapseTwo" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="customHeadingTwo">
                    <div className="px-5 py-4">absolutely! All templates come with full source code and documentation to help you make your own changes.</div>
                  </div>
                </div>
                <div className="hs-accordion" id="customHeadingThree">
                  <button
                    className="hs-accordion-toggle bg-default-100 font-secondary flex w-full items-center justify-between rounded px-5 py-4 text-start text-sm font-semibold disabled:pointer-events-none disabled:opacity-50"
                    aria-expanded="true"
                    aria-controls="customCollapseThree"
                  >
                    Will customizing the template affect support?
                    <Icon icon="chevron-down" className="hs-accordion-active:rotate-180 transition-transform text-base" />
                  </button>
                  <div id="customCollapseThree" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="customHeadingThree">
                    <div className="px-5 py-4">Support is still available, but major custom changes may not be covered under standard support terms.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Page
