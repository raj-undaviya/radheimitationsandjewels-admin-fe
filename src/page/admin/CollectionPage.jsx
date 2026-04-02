import CollectionHeader from "../../components/collection/CollectionHeader";
import CollectionTable from "../../components/collection/CollectionTable";

export default function CollectionPage() {
    return (
        <div className="space-y-6">

            <CollectionHeader />
            <CollectionTable />

        </div>
    );
}