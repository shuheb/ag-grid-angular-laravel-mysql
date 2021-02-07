<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class AthleteController extends Controller
{

    public function getSetFilterValues(Request $request)
    {
        $SQL = DB::select("SELECT DISTINCT athlete FROM ATHLETES ");
        return $SQL;
    }

    public function getData(Request $request)
    {
        // logic to get all Athletes goes here

        $SQL = $this->buildSql($request);
        Log::debug($SQL);

        $results = DB::select($SQL);
        $rowCount = $this->getRowCount($request, $results);
        $resultsForPage = $this->cutResultsToPageSize($request, $results);
        return ['rows' => $resultsForPage, 'lastRow' => $rowCount];
    }

    public function buildSql(Request $request)
    {
        $selectSql = $this->createSelectSql($request);
        $fromSql = "FROM ATHLETES ";
        $whereSql = $this->whereSql($request);
        $groupBySql = $this->groupBySql($request);
        $orderBySql = $this->orderBySql($request);
        $limitSql = $this->createLimitSql($request);



        // $pivotCols = $request->input('pivotCols');
        // $pivotMode = $request->input('pivotMode');



        $SQL = $selectSql . $fromSql . $whereSql . $groupBySql . $orderBySql . $limitSql;
        return $SQL;
    }

    public function createSelectSql(Request $request)
    {
        $rowGroupCols = $request->input('rowGroupCols');
        $valueCols = $request->input('valueCols');
        $groupKeys = $request->input('groupKeys');

        if ($this->isDoingGrouping($rowGroupCols, $groupKeys)) {
            $colsToSelect = [];

            $rowGroupCol = $rowGroupCols[sizeof($groupKeys)];
            array_push($colsToSelect, $rowGroupCol['field']);



            foreach ($valueCols as $key => $value) {
                array_push($colsToSelect, $value['aggFunc'] . '(' . $value['field'] . ') as ' . $value['field']);
            }



            $y =  join(", ", $colsToSelect);

            return "SELECT {$y} ";
        }

        return "SELECT * ";
    }

    public function whereSql(Request $request)
    {
        $rowGroupCols = $request->input('rowGroupCols');
        $groupKeys = $request->input('groupKeys');
        $filterModel = $request->input('filterModel');

        $that = $this;
        $whereParts = [];

        if (sizeof($groupKeys) > 0) {
            foreach ($groupKeys as $key => $value) {
                $colName = $rowGroupCols[$key]['field'];
                array_push($whereParts, "{$colName} = \"{$value}\"");
            }
        }

        if ($filterModel) {
            //
        }

        if (sizeof($whereParts) > 0) {
            $x = join(' and ', $whereParts);

            return " WHERE {$x} ";
        } else {
            return '';
        }
    }

    public function groupBySql(Request $request)
    {

        $rowGroupCols = $request->input('rowGroupCols');
        $groupKeys = $request->input('groupKeys');

        if ($this->isDoingGrouping($rowGroupCols, $groupKeys)) {
            $colsToGroupBy = [];

            $rowGroupCol = $rowGroupCols[sizeof($groupKeys)];
            array_push($colsToGroupBy, $rowGroupCol['field']);

            $ya =  join(", ", $colsToGroupBy);

            return " GROUP BY {$ya} ";
        } else {
            // select all columns
            return "";
        }
    }

    public function orderBySql(Request $request)
    {
        $sortModel = $request->input('sortModel');
        if ($sortModel) {

            $sortParts = [];

            foreach ($sortModel as $key => $value) {
                array_push($sortParts, $value['colId'] . " " . $value['sort']);
            }
            if (sizeof($sortParts) > 0) {
                $sortBy = join(", ", $sortParts);
                return "ORDER BY {$sortBy} ";
            } else {
                return '';
            }
        }
    }

    public function isDoingGrouping($rowGroupCols, $groupKeys)
    {
        // we are not doing grouping if at the lowest level. we are at the lowest level
        // if we are grouping by more columns than we have keys for (that means the user
        // has not expanded a lowest level group, OR we are not grouping at all).

        return sizeof($rowGroupCols) > sizeof($groupKeys);
    }

    public function createLimitSql(Request $request)
    {
        $startRow = $request->input('startRow');
        $endRow = $request->input('endRow');
        $pageSize = ($endRow - $startRow) + 1;

        return "LIMIT {$pageSize} OFFSET {$startRow};";
    }

    public function getRowCount($request, $results)
    {


        if (is_null($results) || !isset($results) || sizeof($results) == 0) {
            return null;
        }
        $currentLastRow = $request['startRow'] + sizeof($results);
        // Log::debug('$currentLastRow -> ' . $currentLastRow);
        // Log::debug(('endRow -> ' . $request['endRow']));
        if ($currentLastRow <= $request['endRow']) {
            return $currentLastRow;
        } else {
            Log::debug('return -1');
            return -1;
        }
        // return $currentLastRow <= $request['endRow'] ? $currentLastRow : -1;
    }

    public function cutResultsToPageSize($request, $results)
    {

        $pageSize = $request['endRow'] - $request['startRow'];

        if ($results && (sizeof($results) > $pageSize)) {

            return array_splice($results, 0, $pageSize);
        } else {
            return $results;
        }
    }




    public function createAthlete(Request $request)
    {
        // logic to create a Athlete record goes here

        return response()->json([
            "message" => "Student not found"
        ], 404);
    }


    public function getAthlete($id)
    {
        // logic to get a Athlete record goes 

        return response()->json([
            "message" => "Student not found"
        ], 404);
    }

    public function updateAthlete(Request $request, $id)
    {
        // logic to update a Athlete record goes here
        return response()->json([
            "message" => "Student not found"
        ], 404);
    }

    public function deleteAthlete($id)
    {
        // logic to delete a student record goes here
        return response()->json([
            "message" => "Student not found"
        ], 404);
    }
}
