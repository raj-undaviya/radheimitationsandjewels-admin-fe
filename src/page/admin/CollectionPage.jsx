import CollectionHeader from "../../components/collection/CollectionHeader";
import CollectionTable from "../../components/collection/CollectionTable";

export default function CollectionPage() {
    return (
        <div className="p-4 sm:p-6 space-y-6">

            <CollectionHeader />
            <CollectionTable />

        </div>
    );
}