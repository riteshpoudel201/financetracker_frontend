import ProtectedLayout from "../components/common/ProtectedLayout"
import TransactionTableLayout from "../components/transaction/TransactionTableLayout"

const Transaction = () => {
  return (
    <ProtectedLayout>
      <section className="w-[95vw] min-h-screen mx-auto ">
        <TransactionTableLayout />
      </section>
    </ProtectedLayout>
  )
}

export default Transaction