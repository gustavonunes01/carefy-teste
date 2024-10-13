<?php

namespace App\Repository;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;

abstract class AbstractRepository
{

    protected $model;

    public function __construct(){
        $this->model = app($this->model);
    }

    public function paginate(Builder $filter, $params){

        $orderBy = $params['order_by'] ?? '';
        $order = $params['order'] ?? 'asc';
        $page = $params['page'] ?? 1;
        $per_page = $params['per_page'] ?? 20;

        if(!$filter)
            $filter = $this->model;

        if(strlen($orderBy) > 0)
            $filter->orderBy($orderBy, $order);

        return $filter->paginate($per_page, ['*'], 'page', $page);
    }

    public function filter($params, $query = null): Builder
    {
        if ($query == null) {
            $filter = $this->model->query();
        } else {
            $filter = $query;
        }

        return $filter;
    }


    /**
     * Retorna todos as linhas do model e paginados.
     *
     * @param array $params
     * @return LengthAwarePaginator
     */
    public function index(array $params)
    {
        $query = $this->model::query();

        $filter = $this->filter($params, $query);

        return $this->paginate($filter, $params);
    }

    public function store(array $data)
    {
//        $create = $this->model->fill($data);

        return $this->model->create($data);
    }

    public function update(array $data, int $id)
    {
        $sale =  $this->model::findOrFail($id);
        $sale->update($data);

        return $sale;
    }


    public function show($id)
    {
        return $this->model::findOrFail($id);
    }

    public function delete($id)
    {
        $sale =  $this->model::findOrFail($id);

        return $sale->delete();
    }

}
