# Web Load Tests

## Dispensary Slugs

Run the following query against production to get a list of slugs:

```
select json_agg(t) from (select slug from dispensary where is_approved = true and is_deleted = false and 'listing2' = any (feature_ids) limit 1000) as t;

```